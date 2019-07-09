import axios from 'axios'
import * as type from './type'

export default {
    // 所有分类数据请求
    getCategorys( { commit } ) {
        axios
        .get("json/category.json")
        .then(res => {
            const action = {
                type: type.CATEGORY_DATA,
                payload: res.data
            }
            commit( action )
        })
        .catch(error => {
            if (error) throw error;
        });
    },
    // 分类详情数据请求
    getCategoryDetails( { commit },title ) {
        axios({
            url:'../json/secondCategory.json'
        })
        .then(res => {
            const action = {
                type: type.CATEGORY_DETAIL_DATA,
                payload: res.data[title]  // 使用组件传递的值获取不同的数据
            }
            commit( action )
        })
        .catch(error => {
            if (error) throw error;
        });
    },
    // 小说获取
    getFictions( { commit },{ secondCate,tag,page,words,sort,status }) {
        axios({
            url: '/novel/i.php',
            params: {
                do: "is_caterank",
                p: 1,
                page: page || 1,
                words: words || '',
                shuqi_h5: '',
                onlyCpBooks: 1,
                secondCate: secondCate || '', // 使用组件传递的值获取不同的数据
                tag: tag || '',
                sort: sort || '',
                status: status || '',
                _: Date.now(),
            }
        })
        .then( res => {
            const action = {
                type: type.FICTION_DATA,
                payload: res.data.data,
            }
            commit( action )
        })
        .catch( error => {
            if(error) throw error;
        });
    },
    // 加载更多小说
    loadMoreFictions( { commit },{ secondCate,tag,page,words,sort,status }) {
        axios({
            url: '/novel/i.php',
            params: {
                do: "is_caterank",
                p: 1,
                page: page || 1,
                words: words || '',
                shuqi_h5: '',
                onlyCpBooks: 1,
                secondCate: secondCate || '', // 使用组件传递的值获取不同的数据
                tag: tag || '',
                sort: sort || '',
                status: status || '',
                _: Date.now(),
            }
        })
        .then( res => {
            const action = {
                type: type.LOAD_MORE_FICTION_DATA,
                payload: res.data.data,
            }
            commit( action )
        })
        .catch( error => {
            if(error) throw error;
        });
    }
}