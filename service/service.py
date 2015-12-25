import json
from functools import partial

from aiohttp import web

import settings
from tools import last_days, date_to_timestamp


def json_response(data):
    dumps = json.dumps
    if settings.DEBUG:
        dumps = partial(json.dumps, indent=4, sort_keys=True)

    return web.Response(text=dumps(data), status=200, content_type='application/json',
                        headers={'Access-Control-Allow-Origin': '*'})


class Service:
    def __init__(self, redis):
        self.redis = redis

    def get_routes(self):
        return [
            ('GET', '/api/rates/week', self.handle_last_week)
        ]

    async def handle_last_week(self, request):
        day_timestamps = list(map(date_to_timestamp, last_days(7)))
        values = await self.redis.hmget(settings.REDIS_KEY_DAILY_RATES, *day_timestamps)

        data = {
            timestamp: json.loads(value.decode())
            for timestamp, value in zip(day_timestamps, values) if value
        }
        return json_response(data)

