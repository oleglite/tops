# -*- coding: utf-8 -*-

import asyncio
import sys
import requests

import aioredis
from defusedxml.ElementTree import fromstring
from pprintpp import pprint

from tools import last_days, date_to_timestamp


def warning(text):
    print('[WARNING]', text)


def get_nbrb_rates(for_date):
    # returns: {char_code: rate} for specified date

    url = 'http://www.nbrb.by/Services/XmlExRates.aspx'
    ondate = for_date.strftime('%m/%d/%Y')
    response = requests.get(url, params={'ondate': ondate})
    text = response.content.decode('utf-8-sig')

    # TODO: check for xml attacks: https://docs.python.org/3/library/xml.html, https://pypi.python.org/pypi/defusedxml/
    root = fromstring(text)

    result = {}
    if root.tag == 'DailyExRates' and root.attrib['Date'] == ondate:
        if len(root) == 0:
            warning('empty DailyExRates for date %s' % ondate)
            return

        for currency_node in root:
            if currency_node.tag != 'Currency':
                warning('%s is not currency node' % currency_node)
                continue

            char_code = currency_node.find('CharCode').text
            rate = float(currency_node.find('Rate').text)
            result[char_code] = rate

    return result


async def update_last_days(n):
    import json
    import settings
    from tools import date_to_timestamp

    redis = await aioredis.create_redis(settings.REDIS_HOST)

    pairs = []
    day_objects = last_days(n)
    for day in day_objects:
        pairs += [date_to_timestamp(day), json.dumps(get_nbrb_rates(day))]

    pprint(pairs)

    redis.hmset(settings.REDIS_KEY_DAILY_RATES, *pairs)


def main():
    if len(sys.argv) != 2:
        print('usage: %s <last_days>' % sys.argv[0])
        sys.exit(1)

    loop = asyncio.get_event_loop()
    loop.run_until_complete(update_last_days(int(sys.argv[1])))


if __name__ == '__main__':
    main()
