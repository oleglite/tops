# -*- coding: utf-8 -*-

DEBUG = True


HTTP_SERVICE_HOST = ('127.0.0.1', 8081)
REDIS_HOST = ('localhost', 6379)

STATIC_PATH = '../static'


REDIS_KEY_DAILY_RATES = 'service:daily_rates'     # {day_timestamp: currency_rates_json}
