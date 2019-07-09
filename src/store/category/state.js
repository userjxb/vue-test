export default {
    categorys: null,  // 总分类
    fictions: [],     // 小说
    categoryDetails: [       // 二级详细分类导航
        {
            key: 'tag1',
            item: []
        },
        {
            key: 'tag2',
            item: [
                {
                    id: 21,
                    words: '',
                    text: '全部'
                },
                {
                    id: 22,
                    words: 1,
                    text: '20万字'
                },
                {
                    id: 23,
                    words: 2,
                    text: '20-100万字'
                },
                {
                    id: 24,
                    words: 3,
                    text: '100万字以上'
                }
            ]
        },
        {
            key: 'tag3',
            item: [
                {
                    id: 31,
                    sort: 'monthHot',
                    text: '最热'
                },
                {
                    id: 32,
                    sort: 'updateTime',
                    text: '最新'
                },
                {
                    id: 33,
                    status: 2,
                    text: '完结'
                }
            ]
        }
    ],
    tagItem: []
}