import * as type from './type'

const mutations = {
    // 修改所有分类数据
    [ type.CATEGORY_DATA ] ( state,action ) {
        state.categorys = action.payload;
    },
    // 修改分类详情数据
    [ type.CATEGORY_DETAIL_DATA ] ( state,action ) {
        state.tagItem = []  // 重置
        state.tagItem.push(action.payload);
        state.categoryDetails[0].item = state.tagItem;
    },
    // 首次获取小说数据
    [ type.FICTION_DATA ] ( state,action ) {
        state.fictions = action.payload;
    },
    // 加载更多小说
    [ type.LOAD_MORE_FICTION_DATA ] ( state,action ) {
        state.fictions = [...state.fictions,...action.payload];
    }
}

export default mutations;