import * as api from '@/apis/user';

export default {
    namespace: 'usercenter',
    state: {
        userinfo: {},
        userOrder: {
            shop: [],
            diy: [
                {
                    _id: '5fa9641b276b07440fc6258e',
                    isSend: 1,
                    isDel: 0,
                    orderGoodNo: 'YI',
                    goodsId: '5ecc2f749bcdc97f0c028741',
                    orderData: [
                        {
                            _id: '5fa9641b276b07440fc6258f',
                            styleNos: 'XI-200614,K0077',
                            sizeId: '5ece73fe9bcdc97f0c02876b',
                            packageCount: 1,
                            cnts: 1,
                            items: [
                                {
                                    sizeInfo: [0, 3, 3, 0],
                                    _id: '5fa9641b276b07440fc62591',
                                    favoriteId: '5fa963dd276b07440fc62588',
                                    total: 6,
                                    totalPrice: 0,
                                    favorite: {
                                        _id: '5fa963dd276b07440fc62588',
                                        isDel: 0,
                                        user: '5f4e72bf7d7bc77ebf3df009',
                                        styleAndColor: [
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5f0b21d89f990234d551e5c2',
                                                        type: 0,
                                                        value: '#edd326',
                                                        code: '1643 姜黄',
                                                        namecn: '1643 姜黄',
                                                        nameen: '1643 姜黄',
                                                        createTime:
                                                            '2020-07-12T14:44:40.839Z',
                                                        updateTime:
                                                            '2020-10-06T01:14:23.165Z',
                                                        categoryId: [
                                                            '5ecc2edb9bcdc97f0c028734',
                                                            '5ecc2edb9bcdc97f0c028733',
                                                            '5ecc2edb9bcdc97f0c028732',
                                                            '5ecc2edb9bcdc97f0c028731',
                                                            '5ecc2edb9bcdc97f0c028730',
                                                            '5ecc2edb9bcdc97f0c02872f',
                                                            '5ecc2edb9bcdc97f0c02872e',
                                                            '5ecc2edb9bcdc97f0c02872d',
                                                            '5ecc2edb9bcdc97f0c02872c',
                                                        ],
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5ecc2edb9bcdc97f0c02872b',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                    {
                                                        _id:
                                                            '5ece13a79bcdc97f0c028756',
                                                        type: 0,
                                                        value: '#32bc32',
                                                        code: '2011叶绿',
                                                        namecn: '叶绿',
                                                        nameen: 'green',
                                                        createTime:
                                                            '2020-05-27T07:15:51.886Z',
                                                        updateTime:
                                                            '2020-10-06T01:35:53.275Z',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                    {
                                                        _id:
                                                            '5f0b21d89f990234d551e5c2',
                                                        type: 0,
                                                        value: '#edd326',
                                                        code: '1643 姜黄',
                                                        namecn: '1643 姜黄',
                                                        nameen: '1643 姜黄',
                                                        createTime:
                                                            '2020-07-12T14:44:40.839Z',
                                                        updateTime:
                                                            '2020-10-06T01:14:23.165Z',
                                                        categoryId: [
                                                            '5ecc2edb9bcdc97f0c028734',
                                                            '5ecc2edb9bcdc97f0c028733',
                                                            '5ecc2edb9bcdc97f0c028732',
                                                            '5ecc2edb9bcdc97f0c028731',
                                                            '5ecc2edb9bcdc97f0c028730',
                                                            '5ecc2edb9bcdc97f0c02872f',
                                                            '5ecc2edb9bcdc97f0c02872e',
                                                            '5ecc2edb9bcdc97f0c02872d',
                                                            '5ecc2edb9bcdc97f0c02872c',
                                                        ],
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5ecc2edb9bcdc97f0c02872b',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                ],
                                                _id: '5fa963dd276b07440fc6258a',
                                                styleId: {
                                                    _id:
                                                        '5effef309f990234d551e563',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2f749bcdc97f0c028741',
                                                        '5ecc2edb9bcdc97f0c02872b',
                                                        '5f2820a757ca0e7bac09cfcc',
                                                        '5f72f6b7f27e22384cd2c413',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2f749bcdc97f0c028743',
                                                        '5ecc2edb9bcdc97f0c028734',
                                                        '5f2820a757ca0e7bac09cfce',
                                                        '5f72fa95f27e22384cd2c416',
                                                    ],
                                                    styleNo: 'XI-200614',
                                                    styleName: '女式单衣',
                                                    scale: 58,
                                                    price: 0,
                                                    styleSize: 27,
                                                    currency: 1,
                                                    categoryName: '女式单衣',
                                                    imgUrl:
                                                        'mrmiss/1600681101356_SHXAbbjXY.png',
                                                    svgUrl:
                                                        'uploads/2020-07-04/1593831199840.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-07-04/1593831202298.svg',
                                                    shadowUrl:
                                                        'mrmiss/1598422830329_NvM0WJK9Rr.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1598422389257_Jealrz4xOk.png',
                                                    attrs: [],
                                                    channels: [],
                                                    createTime:
                                                        '2020-07-04T02:53:36.749Z',
                                                    updateTime:
                                                        '2020-10-05T06:27:22.490Z',
                                                    styleBackSize: 27,
                                                    vposition: 'center',
                                                },
                                            },
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5f3fcd5e97926f3800d962ae',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1598016845507_efseZai8EV.png',
                                                        code: 'LIN/08',
                                                        width: 250,
                                                        height: 250,
                                                        size: 20,
                                                        createTime:
                                                            '2020-08-21T13:34:22.969Z',
                                                        updateTime:
                                                            '2020-08-21T13:45:51.791Z',
                                                    },
                                                ],
                                                _id: '5fa963dd276b07440fc62589',
                                                styleId: {
                                                    _id:
                                                        '5f09889f9f990234d551e594',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2f749bcdc97f0c028741',
                                                        '5ecc2f4f9bcdc97f0c02873e',
                                                        '5f205258537bdb617a558848',
                                                        '5f2820a757ca0e7bac09cfcc',
                                                        '5f64aee6f27e22384cd2c3d9',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2f749bcdc97f0c028742',
                                                        '5ecc2f4f9bcdc97f0c02873f',
                                                        '5f3a795997926f3800d96219',
                                                        '5f2820a757ca0e7bac09cfcd',
                                                        '5f64aee6f27e22384cd2c3db',
                                                    ],
                                                    styleNo: 'XI-180824-K0077',
                                                    styleName: '女式单裤',
                                                    scale: 58,
                                                    price: 0,
                                                    styleSize: 27,
                                                    currency: 1,
                                                    categoryName: '女式单裤',
                                                    imgUrl:
                                                        'mrmiss/1600672870842_2uFKJzk5k.png',
                                                    svgUrl:
                                                        'uploads/2020-07-11/1594460294163.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-07-11/1594460301312.svg',
                                                    shadowUrl:
                                                        'mrmiss/1598586619502_1DSoeSuZV.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1598586493209_-kPaufqvo.png',
                                                    attrs: [],
                                                    channels: [],
                                                    createTime:
                                                        '2020-07-11T09:38:39.417Z',
                                                    updateTime:
                                                        '2020-12-02T03:14:58.933Z',
                                                    styleBackSize: 25,
                                                    vposition: 'center',
                                                },
                                            },
                                        ],
                                        goodId: '5ecc2f749bcdc97f0c028741',
                                        createTime: '2020-11-09T15:44:29.049Z',
                                        updateTime: '2020-11-09T15:44:29.049Z',
                                    },
                                },
                                {
                                    sizeInfo: [0, 3, 2, 0],
                                    _id: '5fa9641b276b07440fc62590',
                                    favoriteId: '5fa963fa276b07440fc6258b',
                                    total: 5,
                                    totalPrice: 0,
                                    favorite: {
                                        _id: '5fa963fa276b07440fc6258b',
                                        isDel: 0,
                                        user: '5f4e72bf7d7bc77ebf3df009',
                                        styleAndColor: [
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5ece12c39bcdc97f0c028753',
                                                        type: 0,
                                                        value: '#ff8c14',
                                                        code: '2003古金黄',
                                                        namecn: '古金黄',
                                                        nameen: 'orange',
                                                        createTime:
                                                            '2020-05-27T07:12:03.244Z',
                                                        updateTime:
                                                            '2020-10-06T01:17:30.611Z',
                                                        categoryId: [
                                                            '5ecc2edb9bcdc97f0c028734',
                                                            '5ecc2edb9bcdc97f0c028733',
                                                            '5ecc2edb9bcdc97f0c028732',
                                                            '5ecc2edb9bcdc97f0c028731',
                                                            '5ecc2edb9bcdc97f0c028730',
                                                            '5ecc2edb9bcdc97f0c02872f',
                                                            '5ecc2edb9bcdc97f0c02872e',
                                                        ],
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5ecc2edb9bcdc97f0c02872b',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                    {
                                                        _id:
                                                            '5f7ac410f27e22384cd2c443',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1601881099198_QbSqbB7og_.png',
                                                        code:
                                                            'YHT-WB16326X-03霞红底繁复花丛',
                                                        width: 260,
                                                        height: 260,
                                                        sizeOrigin: 28,
                                                        size: 25,
                                                        createTime:
                                                            '2020-10-05T06:58:24.038Z',
                                                        updateTime:
                                                            '2020-10-05T08:57:12.046Z',
                                                    },
                                                    {
                                                        _id:
                                                            '5f3a75d197926f3800d96211',
                                                        goodsId: [
                                                            '5ecc2f4f9bcdc97f0c02873e',
                                                            '5f205258537bdb617a558848',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                        categoryId: [],
                                                        type: 0,
                                                        value: '#f7604f',
                                                        code: '2007珊瑚红',
                                                        namecn: '珊瑚红',
                                                        nameen: '珊瑚红',
                                                        createTime:
                                                            '2020-08-17T12:19:29.040Z',
                                                        updateTime:
                                                            '2020-10-06T01:18:29.022Z',
                                                    },
                                                ],
                                                _id: '5fa963fa276b07440fc6258d',
                                                styleId: {
                                                    _id:
                                                        '5effef309f990234d551e563',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2f749bcdc97f0c028741',
                                                        '5ecc2edb9bcdc97f0c02872b',
                                                        '5f2820a757ca0e7bac09cfcc',
                                                        '5f72f6b7f27e22384cd2c413',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2f749bcdc97f0c028743',
                                                        '5ecc2edb9bcdc97f0c028734',
                                                        '5f2820a757ca0e7bac09cfce',
                                                        '5f72fa95f27e22384cd2c416',
                                                    ],
                                                    styleNo: 'XI-200614',
                                                    styleName: '女式单衣',
                                                    scale: 58,
                                                    price: 0,
                                                    styleSize: 27,
                                                    currency: 1,
                                                    categoryName: '女式单衣',
                                                    imgUrl:
                                                        'mrmiss/1600681101356_SHXAbbjXY.png',
                                                    svgUrl:
                                                        'uploads/2020-07-04/1593831199840.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-07-04/1593831202298.svg',
                                                    shadowUrl:
                                                        'mrmiss/1598422830329_NvM0WJK9Rr.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1598422389257_Jealrz4xOk.png',
                                                    attrs: [],
                                                    channels: [],
                                                    createTime:
                                                        '2020-07-04T02:53:36.749Z',
                                                    updateTime:
                                                        '2020-10-05T06:27:22.490Z',
                                                    styleBackSize: 27,
                                                    vposition: 'center',
                                                },
                                            },
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5f3fcf9f97926f3800d962b6',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1598017428534_RdFNiufYWe.png',
                                                        code: 'LIN/01',
                                                        width: 250,
                                                        height: 260,
                                                        size: 28,
                                                        createTime:
                                                            '2020-08-21T13:43:59.918Z',
                                                        updateTime:
                                                            '2020-08-25T16:18:35.349Z',
                                                    },
                                                ],
                                                _id: '5fa963fa276b07440fc6258c',
                                                styleId: {
                                                    _id:
                                                        '5f09889f9f990234d551e594',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2f749bcdc97f0c028741',
                                                        '5ecc2f4f9bcdc97f0c02873e',
                                                        '5f205258537bdb617a558848',
                                                        '5f2820a757ca0e7bac09cfcc',
                                                        '5f64aee6f27e22384cd2c3d9',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2f749bcdc97f0c028742',
                                                        '5ecc2f4f9bcdc97f0c02873f',
                                                        '5f3a795997926f3800d96219',
                                                        '5f2820a757ca0e7bac09cfcd',
                                                        '5f64aee6f27e22384cd2c3db',
                                                    ],
                                                    styleNo: 'XI-180824-K0077',
                                                    styleName: '女式单裤',
                                                    scale: 58,
                                                    price: 0,
                                                    styleSize: 27,
                                                    currency: 1,
                                                    categoryName: '女式单裤',
                                                    imgUrl:
                                                        'mrmiss/1600672870842_2uFKJzk5k.png',
                                                    svgUrl:
                                                        'uploads/2020-07-11/1594460294163.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-07-11/1594460301312.svg',
                                                    shadowUrl:
                                                        'mrmiss/1598586619502_1DSoeSuZV.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1598586493209_-kPaufqvo.png',
                                                    attrs: [],
                                                    channels: [],
                                                    createTime:
                                                        '2020-07-11T09:38:39.417Z',
                                                    updateTime:
                                                        '2020-12-02T03:14:58.933Z',
                                                    styleBackSize: 25,
                                                    vposition: 'center',
                                                },
                                            },
                                        ],
                                        goodId: '5ecc2f749bcdc97f0c028741',
                                        createTime: '2020-11-09T15:44:58.503Z',
                                        updateTime: '2020-11-09T15:44:58.503Z',
                                    },
                                },
                            ],
                            size: {
                                _id: '5ece73fe9bcdc97f0c02876b',
                                isDel: 0,
                                values: [
                                    {
                                        _id: '5f3c01fb97926f3800d96263',
                                        name: '40',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96262',
                                        name: '42',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96261',
                                        name: '44',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96260',
                                        name: '46',
                                    },
                                ],
                                goods: [
                                    '5ecc2edb9bcdc97f0c02872b',
                                    '5ecc2f4f9bcdc97f0c02873e',
                                    '5ecc2f749bcdc97f0c028741',
                                    '5f205258537bdb617a558848',
                                    '5f2820a757ca0e7bac09cfcc',
                                    '5f33c77299d8c73e584e67e9',
                                ],
                                createTime: '2020-05-27T14:06:54.751Z',
                                updateTime: '2020-08-18T16:29:47.958Z',
                            },
                        },
                    ],
                    user: {
                        _id: '5f4e72bf7d7bc77ebf3df009',
                        currency: 0,
                        selectFavorites: ['5f452e737d7bc77ebf3defd1'],
                        channels: ['5f452fa67d7bc77ebf3defd4'],
                        goods: [],
                        account: 'ZS',
                        password: '12345',
                        role: 3,
                        name: '张三',
                        createTime: '2020-09-01T16:11:43.831Z',
                        updateTime: '2020-09-01T16:37:56.314Z',
                    },
                    createTime: '2020-11-09T15:45:31.446Z',
                    updateTime: '2020-11-09T15:45:44.088Z',
                    date: '20201109',
                    orderNo: 'YI-MM202011090004',
                },
                {
                    _id: '5fa95fcf276b07440fc62582',
                    isSend: 1,
                    isDel: 0,
                    orderGoodNo: '',
                    goodsId: '5ecc2f749bcdc97f0c028741',
                    orderData: [
                        {
                            _id: '5fa95fcf276b07440fc62583',
                            styleNos: 'XI-200431,K0077',
                            sizeId: '5ece73fe9bcdc97f0c02876b',
                            packageCount: 1,
                            cnts: 1,
                            items: [
                                {
                                    sizeInfo: [0, 2, 0, 0],
                                    _id: '5fa95fcf276b07440fc62584',
                                    favoriteId: '5fa95fba276b07440fc6257f',
                                    total: 2,
                                    totalPrice: 0,
                                    favorite: {
                                        _id: '5fa95fba276b07440fc6257f',
                                        isDel: 0,
                                        user: '5f4e72bf7d7bc77ebf3df009',
                                        styleAndColor: [
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5ece13a79bcdc97f0c028756',
                                                        type: 0,
                                                        value: '#32bc32',
                                                        code: '2011叶绿',
                                                        namecn: '叶绿',
                                                        nameen: 'green',
                                                        createTime:
                                                            '2020-05-27T07:15:51.886Z',
                                                        updateTime:
                                                            '2020-10-06T01:35:53.275Z',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                    {
                                                        _id:
                                                            '5f3a773197926f3800d96215',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5f205258537bdb617a558848',
                                                        ],
                                                        categoryId: [],
                                                        type: 0,
                                                        value: '#315c78',
                                                        code: '19-4127 TCX',
                                                        namecn: '午夜蓝',
                                                        nameen: '午夜蓝',
                                                        createTime:
                                                            '2020-08-17T12:25:21.090Z',
                                                        updateTime:
                                                            '2020-08-25T16:13:00.159Z',
                                                    },
                                                    {
                                                        _id:
                                                            '5f8e5e43b7e92d43b093757b',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1603165754957_e5VwpcHxY.jpg',
                                                        code:
                                                            'YHT-WB15526X-02黑底荧光绿花图',
                                                        width: 291,
                                                        height: 327,
                                                        flowerCode:
                                                            'YHT-WB15526X-02黑底荧光绿花图',
                                                        sizeOrigin: 20,
                                                        size: 20,
                                                        createTime:
                                                            '2020-10-20T03:49:23.449Z',
                                                        updateTime:
                                                            '2020-10-20T03:49:23.449Z',
                                                    },
                                                    {
                                                        _id:
                                                            '5f8e5e43b7e92d43b093757b',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1603165754957_e5VwpcHxY.jpg',
                                                        code:
                                                            'YHT-WB15526X-02黑底荧光绿花图',
                                                        width: 291,
                                                        height: 327,
                                                        flowerCode:
                                                            'YHT-WB15526X-02黑底荧光绿花图',
                                                        sizeOrigin: 20,
                                                        size: 20,
                                                        createTime:
                                                            '2020-10-20T03:49:23.449Z',
                                                        updateTime:
                                                            '2020-10-20T03:49:23.449Z',
                                                    },
                                                ],
                                                _id: '5fa95fba276b07440fc62581',
                                                styleId: {
                                                    _id:
                                                        '5eed85b460a56379cce24d30',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2f749bcdc97f0c028741',
                                                        '5ecc2edb9bcdc97f0c02872b',
                                                        '5f2820a757ca0e7bac09cfcc',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2f749bcdc97f0c028743',
                                                        '5ecc2edb9bcdc97f0c028734',
                                                        '5f2820a757ca0e7bac09cfce',
                                                    ],
                                                    styleNo: 'XI-200431',
                                                    styleName: '女式单衣',
                                                    scale: 58,
                                                    price: 0,
                                                    currency: 1,
                                                    categoryName: '女式单衣',
                                                    imgUrl:
                                                        'mrmiss/1599303169573_ah9qDzFkZ.png',
                                                    svgUrl:
                                                        'uploads/2020-07-07/1594091716971.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-07-09/1594259446134.svg',
                                                    shadowUrl:
                                                        'mrmiss/1598688968231_c1dmyvqhe.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1598688970652_RZTDrGtzcD.png',
                                                    attrs: [],
                                                    channels: [],
                                                    createTime:
                                                        '2020-06-20T03:42:44.795Z',
                                                    updateTime:
                                                        '2020-09-05T11:14:20.244Z',
                                                    styleSize: 29,
                                                    styleBackSize: 25,
                                                    vposition: 'flex-start',
                                                },
                                            },
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5f3fcd5e97926f3800d962ae',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1598016845507_efseZai8EV.png',
                                                        code: 'LIN/08',
                                                        width: 250,
                                                        height: 250,
                                                        size: 20,
                                                        createTime:
                                                            '2020-08-21T13:34:22.969Z',
                                                        updateTime:
                                                            '2020-08-21T13:45:51.791Z',
                                                    },
                                                ],
                                                _id: '5fa95fba276b07440fc62580',
                                                styleId: {
                                                    _id:
                                                        '5f09889f9f990234d551e594',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2f749bcdc97f0c028741',
                                                        '5ecc2f4f9bcdc97f0c02873e',
                                                        '5f205258537bdb617a558848',
                                                        '5f2820a757ca0e7bac09cfcc',
                                                        '5f64aee6f27e22384cd2c3d9',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2f749bcdc97f0c028742',
                                                        '5ecc2f4f9bcdc97f0c02873f',
                                                        '5f3a795997926f3800d96219',
                                                        '5f2820a757ca0e7bac09cfcd',
                                                        '5f64aee6f27e22384cd2c3db',
                                                    ],
                                                    styleNo: 'XI-180824-K0077',
                                                    styleName: '女式单裤',
                                                    scale: 58,
                                                    price: 0,
                                                    styleSize: 27,
                                                    currency: 1,
                                                    categoryName: '女式单裤',
                                                    imgUrl:
                                                        'mrmiss/1600672870842_2uFKJzk5k.png',
                                                    svgUrl:
                                                        'uploads/2020-07-11/1594460294163.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-07-11/1594460301312.svg',
                                                    shadowUrl:
                                                        'mrmiss/1598586619502_1DSoeSuZV.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1598586493209_-kPaufqvo.png',
                                                    attrs: [],
                                                    channels: [],
                                                    createTime:
                                                        '2020-07-11T09:38:39.417Z',
                                                    updateTime:
                                                        '2020-12-02T03:14:58.933Z',
                                                    styleBackSize: 25,
                                                    vposition: 'center',
                                                },
                                            },
                                        ],
                                        goodId: '5ecc2f749bcdc97f0c028741',
                                        createTime: '2020-11-09T15:26:50.257Z',
                                        updateTime: '2020-11-09T15:26:50.257Z',
                                    },
                                },
                            ],
                            size: {
                                _id: '5ece73fe9bcdc97f0c02876b',
                                isDel: 0,
                                values: [
                                    {
                                        _id: '5f3c01fb97926f3800d96263',
                                        name: '40',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96262',
                                        name: '42',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96261',
                                        name: '44',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96260',
                                        name: '46',
                                    },
                                ],
                                goods: [
                                    '5ecc2edb9bcdc97f0c02872b',
                                    '5ecc2f4f9bcdc97f0c02873e',
                                    '5ecc2f749bcdc97f0c028741',
                                    '5f205258537bdb617a558848',
                                    '5f2820a757ca0e7bac09cfcc',
                                    '5f33c77299d8c73e584e67e9',
                                ],
                                createTime: '2020-05-27T14:06:54.751Z',
                                updateTime: '2020-08-18T16:29:47.958Z',
                            },
                        },
                    ],
                    user: {
                        _id: '5f4e72bf7d7bc77ebf3df009',
                        currency: 0,
                        selectFavorites: ['5f452e737d7bc77ebf3defd1'],
                        channels: ['5f452fa67d7bc77ebf3defd4'],
                        goods: [],
                        account: 'ZS',
                        password: '12345',
                        role: 3,
                        name: '张三',
                        createTime: '2020-09-01T16:11:43.831Z',
                        updateTime: '2020-09-01T16:37:56.314Z',
                    },
                    createTime: '2020-11-09T15:27:11.759Z',
                    updateTime: '2020-11-09T15:27:19.199Z',
                    date: '20201109',
                    orderNo: '-MM202011090003',
                },
                {
                    _id: '5fa95e12276b07440fc62576',
                    isSend: 1,
                    isDel: 0,
                    orderGoodNo: 'YI',
                    goodsId: '5ecc2f749bcdc97f0c028741',
                    orderData: [
                        {
                            _id: '5fa95e12276b07440fc62577',
                            styleNos: 'XI-200429,K0056',
                            sizeId: '5ece73fe9bcdc97f0c02876b',
                            packageCount: 1,
                            cnts: 1,
                            items: [
                                {
                                    sizeInfo: [0, 2, 0, 0],
                                    _id: '5fa95e12276b07440fc62578',
                                    favoriteId: '5fa95b4b276b07440fc6256a',
                                    total: 2,
                                    totalPrice: 0,
                                    favorite: {
                                        _id: '5fa95b4b276b07440fc6256a',
                                        isDel: 1,
                                        user: '5f4e72bf7d7bc77ebf3df009',
                                        styleAndColor: [
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5f3fcdf597926f3800d962b2',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1598017002340_sHjGHf2CR.png',
                                                        code: 'LIN/04',
                                                        width: 250,
                                                        height: 249,
                                                        size: 20,
                                                        createTime:
                                                            '2020-08-21T13:36:53.294Z',
                                                        updateTime:
                                                            '2020-08-21T13:44:55.292Z',
                                                    },
                                                    {
                                                        _id:
                                                            '5ece15559bcdc97f0c02875c',
                                                        type: 0,
                                                        value: '#1043a9',
                                                        code: '2017雾静蓝',
                                                        namecn: '雾静蓝',
                                                        nameen: 'blue',
                                                        createTime:
                                                            '2020-05-27T07:23:01.438Z',
                                                        updateTime:
                                                            '2020-10-06T02:26:07.143Z',
                                                        categoryId: [
                                                            '5ecc2edb9bcdc97f0c028734',
                                                            '5ecc2edb9bcdc97f0c028733',
                                                            '5ecc2edb9bcdc97f0c028732',
                                                            '5ecc2edb9bcdc97f0c028731',
                                                            '5ecc2edb9bcdc97f0c028730',
                                                            '5ecc2edb9bcdc97f0c02872f',
                                                            '5ecc2edb9bcdc97f0c02872e',
                                                        ],
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5ecc2edb9bcdc97f0c02872b',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                    {
                                                        _id:
                                                            '5ece15559bcdc97f0c02875c',
                                                        type: 0,
                                                        value: '#1043a9',
                                                        code: '2017雾静蓝',
                                                        namecn: '雾静蓝',
                                                        nameen: 'blue',
                                                        createTime:
                                                            '2020-05-27T07:23:01.438Z',
                                                        updateTime:
                                                            '2020-10-06T02:26:07.143Z',
                                                        categoryId: [
                                                            '5ecc2edb9bcdc97f0c028734',
                                                            '5ecc2edb9bcdc97f0c028733',
                                                            '5ecc2edb9bcdc97f0c028732',
                                                            '5ecc2edb9bcdc97f0c028731',
                                                            '5ecc2edb9bcdc97f0c028730',
                                                            '5ecc2edb9bcdc97f0c02872f',
                                                            '5ecc2edb9bcdc97f0c02872e',
                                                        ],
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5ecc2edb9bcdc97f0c02872b',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                ],
                                                _id: '5fa95b4b276b07440fc6256c',
                                                styleId: {
                                                    _id:
                                                        '5eed848f60a56379cce24d2e',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2edb9bcdc97f0c02872b',
                                                        '5ecc2f749bcdc97f0c028741',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2edb9bcdc97f0c028734',
                                                        '5ecc2f749bcdc97f0c028743',
                                                    ],
                                                    styleNo: 'XI-200429',
                                                    styleName: '女式单衣',
                                                    scale: 55,
                                                    price: 0,
                                                    currency: 1,
                                                    categoryName: '女式单衣',
                                                    imgUrl:
                                                        'mrmiss/1597060761527_n5f107-Cc.png',
                                                    svgUrl:
                                                        'uploads/2020-06-20/1592624234009.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-08-14/1597388147771.svg',
                                                    shadowUrl:
                                                        'mrmiss/1597388217678_gf51AR9PWR.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1597388304607_LRvh2urq_.png',
                                                    attrs: [
                                                        {
                                                            _id:
                                                                '5f453ad47d7bc77ebf3defdf',
                                                            colorId:
                                                                '5f3fca9397926f3800d962a2',
                                                            scale: 1.8,
                                                            x: 0,
                                                            y: 0,
                                                        },
                                                    ],
                                                    channels: [],
                                                    createTime:
                                                        '2020-06-20T03:37:51.435Z',
                                                    updateTime:
                                                        '2020-08-25T16:22:44.953Z',
                                                    styleSize: 27,
                                                    styleBackSize: 27,
                                                    vposition: 'center',
                                                },
                                            },
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5f3fcdf597926f3800d962b2',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1598017002340_sHjGHf2CR.png',
                                                        code: 'LIN/04',
                                                        width: 250,
                                                        height: 249,
                                                        size: 20,
                                                        createTime:
                                                            '2020-08-21T13:36:53.294Z',
                                                        updateTime:
                                                            '2020-08-21T13:44:55.292Z',
                                                    },
                                                    {
                                                        _id:
                                                            '5f3fcf9f97926f3800d962b6',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1598017428534_RdFNiufYWe.png',
                                                        code: 'LIN/01',
                                                        width: 250,
                                                        height: 260,
                                                        size: 28,
                                                        createTime:
                                                            '2020-08-21T13:43:59.918Z',
                                                        updateTime:
                                                            '2020-08-25T16:18:35.349Z',
                                                    },
                                                ],
                                                _id: '5fa95b4b276b07440fc6256b',
                                                styleId: {
                                                    _id:
                                                        '5f09884f9f990234d551e593',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2f749bcdc97f0c028741',
                                                        '5ecc2edb9bcdc97f0c02872b',
                                                        '5ecc2f4f9bcdc97f0c02873e',
                                                        '5f205258537bdb617a558848',
                                                        '5f2820a757ca0e7bac09cfcc',
                                                        '5f72f6b7f27e22384cd2c413',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2f749bcdc97f0c028742',
                                                        '5ecc2edb9bcdc97f0c028733',
                                                        '5ecc2f4f9bcdc97f0c02873f',
                                                        '5f3a795997926f3800d96219',
                                                        '5f2820a757ca0e7bac09cfcd',
                                                        '5f72fa95f27e22384cd2c415',
                                                    ],
                                                    styleNo: 'XI-160803-K0056',
                                                    styleName: '女式单裤',
                                                    scale: 73,
                                                    price: 0,
                                                    styleSize: 35,
                                                    currency: 1,
                                                    categoryName: '女式单裤',
                                                    imgUrl:
                                                        'mrmiss/1599724497537_yKTiMV5_m.png',
                                                    svgUrl:
                                                        'uploads/2020-07-11/1594460222937.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-07-11/1594460227804.svg',
                                                    shadowUrl:
                                                        'mrmiss/1598604467659_OExdc4TnW.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1598604470335_fpQyA9Ohl.png',
                                                    attrs: [],
                                                    channels: [],
                                                    createTime:
                                                        '2020-07-11T09:37:19.854Z',
                                                    updateTime:
                                                        '2020-12-02T03:15:26.329Z',
                                                    styleBackSize: 28,
                                                    vposition: 'center',
                                                },
                                            },
                                        ],
                                        goodId: '5ecc2f749bcdc97f0c028741',
                                        createTime: '2020-11-09T15:07:55.207Z',
                                        updateTime: '2020-11-09T15:22:09.615Z',
                                    },
                                },
                            ],
                            size: {
                                _id: '5ece73fe9bcdc97f0c02876b',
                                isDel: 0,
                                values: [
                                    {
                                        _id: '5f3c01fb97926f3800d96263',
                                        name: '40',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96262',
                                        name: '42',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96261',
                                        name: '44',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96260',
                                        name: '46',
                                    },
                                ],
                                goods: [
                                    '5ecc2edb9bcdc97f0c02872b',
                                    '5ecc2f4f9bcdc97f0c02873e',
                                    '5ecc2f749bcdc97f0c028741',
                                    '5f205258537bdb617a558848',
                                    '5f2820a757ca0e7bac09cfcc',
                                    '5f33c77299d8c73e584e67e9',
                                ],
                                createTime: '2020-05-27T14:06:54.751Z',
                                updateTime: '2020-08-18T16:29:47.958Z',
                            },
                        },
                    ],
                    user: {
                        _id: '5f4e72bf7d7bc77ebf3df009',
                        currency: 0,
                        selectFavorites: ['5f452e737d7bc77ebf3defd1'],
                        channels: ['5f452fa67d7bc77ebf3defd4'],
                        goods: [],
                        account: 'ZS',
                        password: '12345',
                        role: 3,
                        name: '张三',
                        createTime: '2020-09-01T16:11:43.831Z',
                        updateTime: '2020-09-01T16:37:56.314Z',
                    },
                    createTime: '2020-11-09T15:19:46.952Z',
                    updateTime: '2020-11-09T15:20:09.600Z',
                    date: '20201109',
                    orderNo: 'YI-MM202011090002',
                },
                {
                    _id: '5fa95b5f276b07440fc6256d',
                    isSend: 1,
                    isDel: 0,
                    orderGoodNo: '',
                    goodsId: '5ecc2f749bcdc97f0c028741',
                    orderData: [
                        {
                            _id: '5fa95b5f276b07440fc6256e',
                            styleNos: 'XI-200429,K0056',
                            sizeId: '5ece73fe9bcdc97f0c02876b',
                            packageCount: 1,
                            cnts: 1,
                            items: [
                                {
                                    sizeInfo: [0, 0, 5, 0],
                                    _id: '5fa95b5f276b07440fc6256f',
                                    favoriteId: '5fa95b4b276b07440fc6256a',
                                    total: 5,
                                    totalPrice: 0,
                                    favorite: {
                                        _id: '5fa95b4b276b07440fc6256a',
                                        isDel: 1,
                                        user: '5f4e72bf7d7bc77ebf3df009',
                                        styleAndColor: [
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5f3fcdf597926f3800d962b2',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1598017002340_sHjGHf2CR.png',
                                                        code: 'LIN/04',
                                                        width: 250,
                                                        height: 249,
                                                        size: 20,
                                                        createTime:
                                                            '2020-08-21T13:36:53.294Z',
                                                        updateTime:
                                                            '2020-08-21T13:44:55.292Z',
                                                    },
                                                    {
                                                        _id:
                                                            '5ece15559bcdc97f0c02875c',
                                                        type: 0,
                                                        value: '#1043a9',
                                                        code: '2017雾静蓝',
                                                        namecn: '雾静蓝',
                                                        nameen: 'blue',
                                                        createTime:
                                                            '2020-05-27T07:23:01.438Z',
                                                        updateTime:
                                                            '2020-10-06T02:26:07.143Z',
                                                        categoryId: [
                                                            '5ecc2edb9bcdc97f0c028734',
                                                            '5ecc2edb9bcdc97f0c028733',
                                                            '5ecc2edb9bcdc97f0c028732',
                                                            '5ecc2edb9bcdc97f0c028731',
                                                            '5ecc2edb9bcdc97f0c028730',
                                                            '5ecc2edb9bcdc97f0c02872f',
                                                            '5ecc2edb9bcdc97f0c02872e',
                                                        ],
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5ecc2edb9bcdc97f0c02872b',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                    {
                                                        _id:
                                                            '5ece15559bcdc97f0c02875c',
                                                        type: 0,
                                                        value: '#1043a9',
                                                        code: '2017雾静蓝',
                                                        namecn: '雾静蓝',
                                                        nameen: 'blue',
                                                        createTime:
                                                            '2020-05-27T07:23:01.438Z',
                                                        updateTime:
                                                            '2020-10-06T02:26:07.143Z',
                                                        categoryId: [
                                                            '5ecc2edb9bcdc97f0c028734',
                                                            '5ecc2edb9bcdc97f0c028733',
                                                            '5ecc2edb9bcdc97f0c028732',
                                                            '5ecc2edb9bcdc97f0c028731',
                                                            '5ecc2edb9bcdc97f0c028730',
                                                            '5ecc2edb9bcdc97f0c02872f',
                                                            '5ecc2edb9bcdc97f0c02872e',
                                                        ],
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5ecc2edb9bcdc97f0c02872b',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                ],
                                                _id: '5fa95b4b276b07440fc6256c',
                                                styleId: {
                                                    _id:
                                                        '5eed848f60a56379cce24d2e',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2edb9bcdc97f0c02872b',
                                                        '5ecc2f749bcdc97f0c028741',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2edb9bcdc97f0c028734',
                                                        '5ecc2f749bcdc97f0c028743',
                                                    ],
                                                    styleNo: 'XI-200429',
                                                    styleName: '女式单衣',
                                                    scale: 55,
                                                    price: 0,
                                                    currency: 1,
                                                    categoryName: '女式单衣',
                                                    imgUrl:
                                                        'mrmiss/1597060761527_n5f107-Cc.png',
                                                    svgUrl:
                                                        'uploads/2020-06-20/1592624234009.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-08-14/1597388147771.svg',
                                                    shadowUrl:
                                                        'mrmiss/1597388217678_gf51AR9PWR.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1597388304607_LRvh2urq_.png',
                                                    attrs: [
                                                        {
                                                            _id:
                                                                '5f453ad47d7bc77ebf3defdf',
                                                            colorId:
                                                                '5f3fca9397926f3800d962a2',
                                                            scale: 1.8,
                                                            x: 0,
                                                            y: 0,
                                                        },
                                                    ],
                                                    channels: [],
                                                    createTime:
                                                        '2020-06-20T03:37:51.435Z',
                                                    updateTime:
                                                        '2020-08-25T16:22:44.953Z',
                                                    styleSize: 27,
                                                    styleBackSize: 27,
                                                    vposition: 'center',
                                                },
                                            },
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5f3fcdf597926f3800d962b2',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1598017002340_sHjGHf2CR.png',
                                                        code: 'LIN/04',
                                                        width: 250,
                                                        height: 249,
                                                        size: 20,
                                                        createTime:
                                                            '2020-08-21T13:36:53.294Z',
                                                        updateTime:
                                                            '2020-08-21T13:44:55.292Z',
                                                    },
                                                    {
                                                        _id:
                                                            '5f3fcf9f97926f3800d962b6',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1598017428534_RdFNiufYWe.png',
                                                        code: 'LIN/01',
                                                        width: 250,
                                                        height: 260,
                                                        size: 28,
                                                        createTime:
                                                            '2020-08-21T13:43:59.918Z',
                                                        updateTime:
                                                            '2020-08-25T16:18:35.349Z',
                                                    },
                                                ],
                                                _id: '5fa95b4b276b07440fc6256b',
                                                styleId: {
                                                    _id:
                                                        '5f09884f9f990234d551e593',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2f749bcdc97f0c028741',
                                                        '5ecc2edb9bcdc97f0c02872b',
                                                        '5ecc2f4f9bcdc97f0c02873e',
                                                        '5f205258537bdb617a558848',
                                                        '5f2820a757ca0e7bac09cfcc',
                                                        '5f72f6b7f27e22384cd2c413',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2f749bcdc97f0c028742',
                                                        '5ecc2edb9bcdc97f0c028733',
                                                        '5ecc2f4f9bcdc97f0c02873f',
                                                        '5f3a795997926f3800d96219',
                                                        '5f2820a757ca0e7bac09cfcd',
                                                        '5f72fa95f27e22384cd2c415',
                                                    ],
                                                    styleNo: 'XI-160803-K0056',
                                                    styleName: '女式单裤',
                                                    scale: 73,
                                                    price: 0,
                                                    styleSize: 35,
                                                    currency: 1,
                                                    categoryName: '女式单裤',
                                                    imgUrl:
                                                        'mrmiss/1599724497537_yKTiMV5_m.png',
                                                    svgUrl:
                                                        'uploads/2020-07-11/1594460222937.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-07-11/1594460227804.svg',
                                                    shadowUrl:
                                                        'mrmiss/1598604467659_OExdc4TnW.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1598604470335_fpQyA9Ohl.png',
                                                    attrs: [],
                                                    channels: [],
                                                    createTime:
                                                        '2020-07-11T09:37:19.854Z',
                                                    updateTime:
                                                        '2020-12-02T03:15:26.329Z',
                                                    styleBackSize: 28,
                                                    vposition: 'center',
                                                },
                                            },
                                        ],
                                        goodId: '5ecc2f749bcdc97f0c028741',
                                        createTime: '2020-11-09T15:07:55.207Z',
                                        updateTime: '2020-11-09T15:22:09.615Z',
                                    },
                                },
                            ],
                            size: {
                                _id: '5ece73fe9bcdc97f0c02876b',
                                isDel: 0,
                                values: [
                                    {
                                        _id: '5f3c01fb97926f3800d96263',
                                        name: '40',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96262',
                                        name: '42',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96261',
                                        name: '44',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96260',
                                        name: '46',
                                    },
                                ],
                                goods: [
                                    '5ecc2edb9bcdc97f0c02872b',
                                    '5ecc2f4f9bcdc97f0c02873e',
                                    '5ecc2f749bcdc97f0c028741',
                                    '5f205258537bdb617a558848',
                                    '5f2820a757ca0e7bac09cfcc',
                                    '5f33c77299d8c73e584e67e9',
                                ],
                                createTime: '2020-05-27T14:06:54.751Z',
                                updateTime: '2020-08-18T16:29:47.958Z',
                            },
                        },
                        {
                            items: [
                                {
                                    sizeInfo: [2, 0, 0, 0],
                                    _id: '5f9e940f646d3d4670cb336b',
                                    favoriteId: '5f9e93ff646d3d4670cb3367',
                                    total: 2,
                                    totalPrice: 0,
                                    favorite: {
                                        _id: '5f9e93ff646d3d4670cb3367',
                                        isDel: 1,
                                        user: '5f4e72bf7d7bc77ebf3df009',
                                        styleAndColor: [
                                            {
                                                colorIds: [
                                                    {
                                                        _id:
                                                            '5f8e867eb7e92d43b0937583',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                        ],
                                                        categoryId: [],
                                                        type: 1,
                                                        value:
                                                            'mrmiss/1603176053753_wZ4go-DmA.jpg',
                                                        code:
                                                            'YHT-WB15629X-01橡皮红组抽象树枝',
                                                        width: 562,
                                                        height: 673,
                                                        flowerCode:
                                                            'YHT-WB15629X-01橡皮红组抽象树枝',
                                                        sizeOrigin: 9,
                                                        size: 9,
                                                        createTime:
                                                            '2020-10-20T06:41:02.024Z',
                                                        updateTime:
                                                            '2020-10-20T06:41:22.894Z',
                                                    },
                                                    {
                                                        _id:
                                                            '5ece13a79bcdc97f0c028756',
                                                        type: 0,
                                                        value: '#32bc32',
                                                        code: '2011叶绿',
                                                        namecn: '叶绿',
                                                        nameen: 'green',
                                                        createTime:
                                                            '2020-05-27T07:15:51.886Z',
                                                        updateTime:
                                                            '2020-10-06T01:35:53.275Z',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                    {
                                                        _id:
                                                            '5ece13a79bcdc97f0c028756',
                                                        type: 0,
                                                        value: '#32bc32',
                                                        code: '2011叶绿',
                                                        namecn: '叶绿',
                                                        nameen: 'green',
                                                        createTime:
                                                            '2020-05-27T07:15:51.886Z',
                                                        updateTime:
                                                            '2020-10-06T01:35:53.275Z',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                    {
                                                        _id:
                                                            '5ece13a79bcdc97f0c028756',
                                                        type: 0,
                                                        value: '#32bc32',
                                                        code: '2011叶绿',
                                                        namecn: '叶绿',
                                                        nameen: 'green',
                                                        createTime:
                                                            '2020-05-27T07:15:51.886Z',
                                                        updateTime:
                                                            '2020-10-06T01:35:53.275Z',
                                                        goodsId: [
                                                            '5ecc2f749bcdc97f0c028741',
                                                            '5f72f6b7f27e22384cd2c413',
                                                        ],
                                                    },
                                                ],
                                                _id: '5f9e93ff646d3d4670cb3368',
                                                styleId: {
                                                    _id:
                                                        '5eed85b460a56379cce24d30',
                                                    tags: [
                                                        'SOUTHERN',
                                                        'CENTER',
                                                        'NORTH',
                                                    ],
                                                    isDel: 0,
                                                    goodsId: [
                                                        '5ecc2f749bcdc97f0c028741',
                                                        '5ecc2edb9bcdc97f0c02872b',
                                                        '5f2820a757ca0e7bac09cfcc',
                                                    ],
                                                    categoryId: [
                                                        '5ecc2f749bcdc97f0c028743',
                                                        '5ecc2edb9bcdc97f0c028734',
                                                        '5f2820a757ca0e7bac09cfce',
                                                    ],
                                                    styleNo: 'XI-200431',
                                                    styleName: '女式单衣',
                                                    scale: 58,
                                                    price: 0,
                                                    currency: 1,
                                                    categoryName: '女式单衣',
                                                    imgUrl:
                                                        'mrmiss/1599303169573_ah9qDzFkZ.png',
                                                    svgUrl:
                                                        'uploads/2020-07-07/1594091716971.svg',
                                                    svgUrlBack:
                                                        'uploads/2020-07-09/1594259446134.svg',
                                                    shadowUrl:
                                                        'mrmiss/1598688968231_c1dmyvqhe.png',
                                                    shadowUrlBack:
                                                        'mrmiss/1598688970652_RZTDrGtzcD.png',
                                                    attrs: [],
                                                    channels: [],
                                                    createTime:
                                                        '2020-06-20T03:42:44.795Z',
                                                    updateTime:
                                                        '2020-09-05T11:14:20.244Z',
                                                    styleSize: 29,
                                                    styleBackSize: 25,
                                                    vposition: 'flex-start',
                                                },
                                            },
                                        ],
                                        goodId: '5ecc2f749bcdc97f0c028741',
                                        createTime: '2020-11-01T10:54:55.944Z',
                                        updateTime: '2020-11-01T10:55:43.189Z',
                                    },
                                },
                            ],
                            _id: '5f9e940f646d3d4670cb336a',
                            styleNos: 'XI-200431',
                            sizeId: '5ece73fe9bcdc97f0c02876b',
                            packageCount: 1,
                            cnts: 1,
                            size: {
                                _id: '5ece73fe9bcdc97f0c02876b',
                                isDel: 0,
                                values: [
                                    {
                                        _id: '5f3c01fb97926f3800d96263',
                                        name: '40',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96262',
                                        name: '42',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96261',
                                        name: '44',
                                    },
                                    {
                                        _id: '5f3c01fb97926f3800d96260',
                                        name: '46',
                                    },
                                ],
                                goods: [
                                    '5ecc2edb9bcdc97f0c02872b',
                                    '5ecc2f4f9bcdc97f0c02873e',
                                    '5ecc2f749bcdc97f0c028741',
                                    '5f205258537bdb617a558848',
                                    '5f2820a757ca0e7bac09cfcc',
                                    '5f33c77299d8c73e584e67e9',
                                ],
                                createTime: '2020-05-27T14:06:54.751Z',
                                updateTime: '2020-08-18T16:29:47.958Z',
                            },
                        },
                    ],
                    user: {
                        _id: '5f4e72bf7d7bc77ebf3df009',
                        currency: 0,
                        selectFavorites: ['5f452e737d7bc77ebf3defd1'],
                        channels: ['5f452fa67d7bc77ebf3defd4'],
                        goods: [],
                        account: 'ZS',
                        password: '12345',
                        role: 3,
                        name: '张三',
                        createTime: '2020-09-01T16:11:43.831Z',
                        updateTime: '2020-09-01T16:37:56.314Z',
                    },
                    createTime: '2020-11-09T15:08:15.571Z',
                    updateTime: '2020-11-09T15:08:24.172Z',
                    date: '20201109',
                    orderNo: '-MM202011090001',
                },
            ],
            capsule: [],
        },
    },
    reducers: {
        setUserInfo(state, action) {
            return {
                ...state,
                userinfo: action.payload,
            };
        },
        setUserOrder(state, action) {
            return {
                ...state,
                userOrder: action.payload,
            };
        },
    },
    effects: {
        *saveSetting({ payload }, { call, put }) {
            const { data } = yield call(api.saveSetting, payload);
            if (data) {
                yield put({
                    type: 'setUserInfo',
                    payload: data,
                });
                // history.push('/main');
            }
        },
        *getUserOrder(_, { call, put }) {
            const { data } = yield call(api.getCurrentUserOrder);
            if (data) {
                // localStorage.token = data.token;
                yield put({
                    type: 'setUserOrder',
                    payload: data,
                });
            }
        },
    },
};
