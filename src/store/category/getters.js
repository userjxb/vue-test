const getters = {
    // 获取所有分类数据
    get_category_data( state ) {
        return state.categorys;
    },
    // 获取分类详情数据
    get_category_detail_data( state ) {
        return state.categoryDetails;
    },
    // 获取小说数据
    get_fictions_data( state ) {
        return state.fictions;
    }
}

export default getters;