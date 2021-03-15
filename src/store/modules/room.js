import produce from "immer";

const initialState = {
    myRooms: [], // 유저가 가입한 스터디방 리스트
    hasMoreMyRooms: false,
    loadingMyRooms: false,

    roomsByCategory: [],
    hasMoreRoomsByCategory: false,
    loadingRoomsByCategory: false,

    popularRooms: [], // 인기 스터디방 리스트
    recentlyCreatedRooms: [], // 신규 스터디방 리스트

    rooms: [],
    hasMoreRooms: false,
    loadingRooms: false,

    isCreatingRoom: false, // 스터디방 생성 중
    createRoomErrorReason: "", // 스터디방 생성 실패 사유
    roomCreated: false,

    loadingRoomDetail: true,
    roomDetail: {
        roomId: 0,
        category: "",
        createDate: "",
        isMember: false,
        isManager: false,
        description: "",
        joinCount: 0,
        manager: {},
        maxCount: 0,
        name: "",
        unlimited: false
    },
    loadRoomDetailError: null,

    isJoiningRoom: false, // 스터디방 가입
    joinedRoom: false,
    joinRoomErrorReason: "",

    isDeletingRoom: false, // 스터디방 폐쇄
    deleteRoomErrorReason: "",

    isChangingCover: false, // 커버 이미지 변경
    changeCoverErrorReason: "",

    isChangingCategory: false, // 카테고리 변경
    changeCategoryErrorReason: "",

    isEditingRoom: false, // 방 정보 수정
    editRoomErrorReason: ""
};

// Actions
export const CREATE_ROOM_REQUEST = "CREATE_ROOM_ROOMS_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_FAILURE = "CREATE_ROOM_FAILURE";

export const LOAD_ROOMS_BY_CATEGORY_REQUEST = "LOAD_ROOMS_BY_CATEGORY_REQUEST";
export const LOAD_ROOMS_BY_CATEGORY_SUCCESS = "LOAD_ROOMS_BY_CATEGORY_SUCCESS";
export const LOAD_ROOMS_BY_CATEGORY_FAILURE = "LOAD_ROOMS_BY_CATEGORY_FAILURE";

export const LOAD_MY_ROOMS_REQUEST = "LOAD_MY_ROOMS_REQUEST";
export const LOAD_MY_ROOMS_SUCCESS = "LOAD_MY_ROOMS_SUCCESS";
export const LOAD_MY_ROOMS_FAILURE = "LOAD_MY_ROOMS_FAILURE";

export const LOAD_POPULAR_ROOMS_REQUEST = "LOAD_POPULAR_ROOMS_REQUEST";
export const LOAD_POPULAR_ROOMS_SUCCESS = "LOAD_POPULAR_ROOMS_SUCCESS";
export const LOAD_POPULAR_ROOMS_FAILURE = "LOAD_POPULAR_ROOMS_FAILURE";

export const LOAD_RECENTLY_CREATED_ROOMS_REQUEST = "LOAD_RECENTLY_CREATED_ROOMS_REQUEST";
export const LOAD_RECENTLY_CREATED_ROOMS_SUCCESS = "LOAD_RECENTLY_CREATED_ROOMS_SUCCESS";
export const LOAD_RECENTLY_CREATED_ROOMS_FAILURE = "LOAD_RECENTLY_CREATED_ROOMS_FAILURE";

export const LOAD_ROOMS_REQUEST = "LOAD_ROOMS_REQUEST";
export const LOAD_ROOMS_SUCCESS = "LOAD_ROOMS_SUCCESS";
export const LOAD_ROOMS_FAILURE = "LOAD_ROOMS_FAILURE";

export const LOAD_ROOM_DETAIL_REQUEST = "LOAD_ROOM_DETAIL_REQUEST";
export const LOAD_ROOM_DETAIL_SUCCESS = "LOAD_ROOM_DETAIL_SUCCESS";
export const LOAD_ROOM_DETAIL_FAILURE = "LOAD_ROOM_DETAIL_FAILURE";

export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST";
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const JOIN_ROOM_FAILURE = "JOIN_ROOM_FAILURE";

export const DELETE_ROOM_REQUEST = "DELETE_ROOM_REQUEST";
export const DELETE_ROOM_SUCCESS = "DELETE_ROOM_SUCCESS";
export const DELETE_ROOM_FAILURE = "DELETE_ROOM_FAILURE";

export const CHANGE_COVER_REQUEST = "CHANGE_COVER_REQUEST";
export const CHANGE_COVER_SUCCESS = "CHANGE_COVER_SUCCESS";
export const CHANGE_COVER_FAILURE = "CHANGE_COVER_FAILURE";

export const CHANGE_CATEGORY_REQUEST = "CHANGE_CATEGORY_REQUEST";
export const CHANGE_CATEGORY_SUCCESS = "CHANGE_CATEGORY_SUCCESS";
export const CHANGE_CATEGORY_FAILURE = "CHANGE_CATEGORY_FAILURE";

export const EDIT_ROOM_REQUEST = "EDIT_ROOM_REQUEST";
export const EDIT_ROOM_SUCCESS = "EDIT_ROOM_SUCCESS";
export const EDIT_ROOM_FAILURE = "EDIT_ROOM_FAILURE";

export const DECREMENT_MEMBER_COUNT = "DECREMENT_MEMBER_COUNT";

export const DEPOSE_MANAGER = "DEPOSE_MANAGER";

const room = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            // 스터디방 생성 ///////////////////////////////
            case CREATE_ROOM_REQUEST: {
                draft.isCreatingRoom = true;
                draft.roomCreated = false;
                draft.createRoomErrorReason = "";
                break;
            }
            case CREATE_ROOM_SUCCESS: {
                draft.isCreatingRoom = false;
                draft.myRooms.unshift(action.data);
                draft.roomCreated = true;
                break;
            }
            case CREATE_ROOM_FAILURE: {
                draft.isCreatingRoom = false;
                draft.createRoomErrorReason = action.error;
                break;
            }

            // 나의 스터디방 리스트 ///////////////////////////////
            case LOAD_MY_ROOMS_REQUEST: {
                draft.myRooms = draft.hasMoreMyRooms ? draft.myRooms : [];
                draft.loadingMyRooms = true;
                break;
            }
            case LOAD_MY_ROOMS_SUCCESS: {
                if (action.first) {
                    draft.myRooms = action.data;
                } else {
                    action.data.forEach(d => {
                        draft.myRooms.push(d);
                    });
                }
                draft.hasMoreMyRooms = !action.last;
                draft.loadingMyRooms = false;
                break;
            }
            case LOAD_MY_ROOMS_FAILURE: {
                draft.loadingMyRooms = false;
                break;
            }

            // 카테고리 별 스터디방 리스트 ///////////////////////////////
            case LOAD_ROOMS_BY_CATEGORY_REQUEST: {
                draft.roomsByCategory = draft.hasMoreRoomsByCategory ? draft.roomsByCategory : [];
                draft.loadingRoomsByCategory = true;
                break;
            }
            case LOAD_ROOMS_BY_CATEGORY_SUCCESS: {
                if (action.first) {
                    draft.roomsByCategory = action.data;
                } else {
                    action.data.forEach(d => {
                        draft.roomsByCategory.push(d);
                    });
                }
                draft.hasMoreRoomsByCategory = !action.last;
                draft.loadingRoomsByCategory = false;
                break;
            }
            case LOAD_ROOMS_BY_CATEGORY_FAILURE: {
                draft.loadingRoomsByCategory = false;
                break;
            }

            // 인기 스터디방 리스트 ///////////////////////////////
            case LOAD_POPULAR_ROOMS_REQUEST: {
                draft.popularRooms = [];
                break;
            }
            case LOAD_POPULAR_ROOMS_SUCCESS: {
                draft.popularRooms = action.data;
                break;
            }
            case LOAD_POPULAR_ROOMS_FAILURE: {
                break;
            }

            // 최근 생성된 스터디방 리스트 ///////////////////////////////
            case LOAD_RECENTLY_CREATED_ROOMS_REQUEST: {
                draft.recentlyCreatedRooms = [];
                break;
            }
            case LOAD_RECENTLY_CREATED_ROOMS_SUCCESS: {
                draft.recentlyCreatedRooms = action.data;
                break;
            }
            case LOAD_RECENTLY_CREATED_ROOMS_FAILURE: {
                break;
            }

            // 모든 스터디방 리스트 ///////////////////////////////
            case LOAD_ROOMS_REQUEST: {
                draft.rooms = draft.hasMoreRooms ? draft.rooms : [];
                draft.loadingRooms = true;
                break;
            }
            case LOAD_ROOMS_SUCCESS: {
                if (action.first) {
                    draft.rooms = action.data;
                } else {
                    action.data.forEach(d => {
                        draft.rooms.push(d);
                    });
                }
                draft.hasMoreRooms = !action.last;
                draft.loadingRooms = false;
                break;
            }
            case LOAD_ROOMS_FAILURE: {
                draft.loadingRooms = false;
                break;
            }

            // 스터디방 뷰
            case LOAD_ROOM_DETAIL_REQUEST: {
                draft.loadingRoomDetail = true;
                draft.roomDetail = {};
                draft.loadRoomDetailError = null;
                break;
            }
            case LOAD_ROOM_DETAIL_SUCCESS: {
                draft.roomDetail = action.data;
                draft.loadingRoomDetail = false;
                break;
            }
            case LOAD_ROOM_DETAIL_FAILURE: {
                draft.loadingRoomDetail = false;
                draft.loadRoomDetailError = action.error;
                break;
            }

            // 스터디방 가입
            case JOIN_ROOM_REQUEST: {
                draft.isJoiningRoom = true;
                draft.joinedRoom = false;
                draft.joinRoomErrorReason = "";
                break;
            }
            case JOIN_ROOM_SUCCESS: {
                draft.isJoiningRoom = false;
                draft.joinedRoom = true;
                break;
            }
            case JOIN_ROOM_FAILURE: {
                draft.isJoiningRoom = false;
                draft.joinedRoom = true;
                draft.joinRoomErrorReason = action.error;
                break;
            }

            // 스터디방 삭제
            case DELETE_ROOM_REQUEST: {
                draft.isDeletingRoom = true;
                draft.deleteRoomErrorReason = "";
                break;
            }
            case DELETE_ROOM_SUCCESS: {
                draft.isDeletingRoom = false;
                break;
            }
            case DELETE_ROOM_FAILURE: {
                draft.isDeletingRoom = false;
                draft.deleteRoomErrorReason = action.error;
                break;
            }

            // 커버 이미지 변경
            case CHANGE_COVER_REQUEST: {
                draft.isChangingCover = true;
                draft.changeCoverErrorReason = "";
                break;
            }
            case CHANGE_COVER_SUCCESS: {
                draft.isChangingCover = false;
                draft.roomDetail.coverImage = action.cover;
                draft.roomDetail.coverGroupId = action.coverGroupId;
                break;
            }
            case CHANGE_COVER_FAILURE: {
                draft.isChangingCover = false;
                draft.changeCoverErrorReason = action.error;
                break;
            }

            // 카테고리 변경
            case CHANGE_CATEGORY_REQUEST: {
                draft.isChangingCategory = true;
                draft.changeCategoryErrorReason = "";
                break;
            }
            case CHANGE_CATEGORY_SUCCESS: {
                draft.isChangingCategory = false;
                draft.roomDetail.category = action.category;
                draft.roomDetail.categoryId = action.categoryId;
                break;
            }
            case CHANGE_CATEGORY_FAILURE: {
                draft.isChangingCategory = false;
                draft.changeCategoryErrorReason = action.error;
                break;
            }

            // 스터디방 정보 수정
            case EDIT_ROOM_REQUEST: {
                draft.isEditingRoom = true;
                draft.editRoomErrorReason = "";
                break;
            }
            case EDIT_ROOM_SUCCESS: {
                draft.isEditingRoom = false;
                draft.roomDetail.name = action.name;
                draft.roomDetail.description = action.description;
                draft.roomDetail.maxCount = action.maxCount;
                draft.roomDetail.unlimited = action.unlimited;
                break;
            }
            case EDIT_ROOM_FAILURE: {
                draft.isEditingRoom = false;
                draft.editRoomErrorReason = action.error;
                break;
            }

            // 멤버수 감소
            case DECREMENT_MEMBER_COUNT: {
                draft.roomDetail.joinCount -= draft.roomDetail.joinCount;
                break;
            }

            // 매니저 권한 박탈
            case DEPOSE_MANAGER: {
                draft.roomDetail.isManager = false;
                break;
            }

            default: {
                break;
            }
        }
    });

export default room;
