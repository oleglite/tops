# -*- coding: utf-8 -*-

import asyncio
from aiohttp import web

import aioredis

import settings
from service import Service


async def init(loop):
    redis = await aioredis.create_redis(settings.REDIS_HOST)
    service = Service(redis)

    app = web.Application(loop=loop)
    for route in service.get_routes():
        app.router.add_route(*route)

    srv = await loop.create_server(app.make_handler(), *settings.HTTP_SERVICE_HOST)
    print("Server started at http://%s:%s" % settings.HTTP_SERVICE_HOST)
    return srv


def main():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(init(loop))
    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
