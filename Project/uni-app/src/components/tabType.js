const userTab = [
    {
        pagePath: "/pages/index/index",
        text: "浏览",
        iconPath: "/static/Postcard.png",
        selectedIconPath: "/static/Postcard_selected.png",
        selectedColor: "#409EFF",
    },
    {
        pagePath: "/pages/send/index",
        text: "发表",
        iconPath: "/static/EditPen.png",
        selectedIconPath: "/static/EditPen_selected.png",
        selectedColor: "#409EFF",
    },
]
const managerTab = [
    {
        pagePath: "/pages/check/index",
        text: "审核",
        iconPath: "/static/DocumentChecked.png",
        selectedIconPath: "/static/DocumentChecked_selected.png",
        selectedColor: "#2bb88a",
    },
    {
        pagePath: "/pages/manage/index",
        text: "管理",
        iconPath: "/static/Memo.png",
        selectedIconPath: "/static/Memo_selected.png",
        selectedColor: "#2bb88a",
    }
]

export default {
    userTab,
    managerTab
}