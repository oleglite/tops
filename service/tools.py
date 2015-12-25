# -*- coding: utf-8 -*-

import time
from datetime import date, timedelta


def date_to_timestamp(date_obj):
    return int(time.mktime(date_obj.timetuple()))


def timestamp_to_date(timestamp):
    return date.fromtimestamp(timestamp)


def last_days(n):
    """
    Return iterator with last n days (date object), today included
    """
    one_day = timedelta(days=1)
    today = date.today()
    return (today - i * one_day for i in range(n))
