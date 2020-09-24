import produce from 'immer';
import {LOAD_CATEGORIES_REQUEST} from "./category";

const initialState = {
    myRooms : [], // 유저가 가입한 스터디방 리스트
    hasMoreMyRooms : false,
    roomsByCategory : [],
    hasMoreRoomsByCategory : false,
    popularRooms : [], // 인기 스터디방 리스트
    recentlyCreatedRooms : [], // 신규 스터디방 리스트

    isCreatingRoom : false, // 스터디방 생성 중
    createRoomErrorReason: '', // 스터디방 생성 실패 사유
    roomCreated : false,

    loadingRoomDetail : true,
    roomDetail : {
        roomId: 0,
        category: "",
        createDate: "",
        currentAccount: {},
        description: "",
        joinCount: 0,
        manager: {},
        maxCount: 0,
        name: "",
        unlimited: false,
    },

    isJoiningRoom: false,
    joinedRoom: false,
    joinRoomErrorReason: '',
};


// Actions
export const CREATE_ROOM_REQUEST = 'CREATE_ROOM_ROOMS_REQUEST';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE';

export const LOAD_ROOMS_BY_CATEGORY_REQUEST = 'LOAD_ROOMS_BY_CATEGORY_REQUEST';
export const LOAD_ROOMS_BY_CATEGORY_SUCCESS = 'LOAD_ROOMS_BY_CATEGORY_SUCCESS';
export const LOAD_ROOMS_BY_CATEGORY_FAILURE = 'LOAD_ROOMS_BY_CATEGORY_FAILURE';

export const LOAD_MY_ROOMS_REQUEST = 'LOAD_MY_ROOMS_REQUEST';
export const LOAD_MY_ROOMS_SUCCESS = 'LOAD_MY_ROOMS_SUCCESS';
export const LOAD_MY_ROOMS_FAILURE = 'LOAD_MY_ROOMS_FAILURE';

export const LOAD_POPULAR_ROOMS_REQUEST = 'LOAD_POPULAR_ROOMS_REQUEST';
export const LOAD_POPULAR_ROOMS_SUCCESS = 'LOAD_POPULAR_ROOMS_SUCCESS';
export const LOAD_POPULAR_ROOMS_FAILURE = 'LOAD_POPULAR_ROOMS_FAILURE';

export const LOAD_RECENTLY_CREATED_ROOMS_REQUEST = 'LOAD_RECENTLY_CREATED_ROOMS_REQUEST';
export const LOAD_RECENTLY_CREATED_ROOMS_SUCCESS = 'LOAD_RECENTLY_CREATED_ROOMS_SUCCESS';
export const LOAD_RECENTLY_CREATED_ROOMS_FAILURE = 'LOAD_RECENTLY_CREATED_ROOMS_FAILURE';

export const LOAD_ROOM_DETAIL_REQUEST = 'LOAD_ROOM_DETAIL_REQUEST';
export const LOAD_ROOM_DETAIL_SUCCESS = 'LOAD_ROOM_DETAIL_SUCCESS';
export const LOAD_ROOM_DETAIL_FAILURE = 'LOAD_ROOM_DETAIL_FAILURE';

export const JOIN_ROOM_REQUEST = 'JOIN_ROOM_REQUEST';
export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS';
export const JOIN_ROOM_FAILURE = 'JOIN_ROOM_FAILURE';



const room = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            // 스터디방 생성 ///////////////////////////////
            case CREATE_ROOM_REQUEST : {
                draft.isCreatingRoom = true;
                draft.roomCreated = false;
                draft.createRoomErrorReason = '';
                break;
            }
            case CREATE_ROOM_SUCCESS : {
                draft.isCreatingRoom = false;
                draft.myRooms.unshift(action.data);
                draft.roomCreated = true;
                break;
            }
            case CREATE_ROOM_FAILURE : {
                draft.isCreatingRoom = false;
                draft.createRoomErrorReason = action.error;
                break;
            }

            // 나의 스터디방 리스트 ///////////////////////////////
            case LOAD_MY_ROOMS_REQUEST : {
                draft.myRooms = draft.hasMoreMyRooms ? draft.myRooms : [];
                break;
            }
            case LOAD_MY_ROOMS_SUCCESS: {
                if(action.first) {
                    draft.myRooms = action.data;
                }else {
                    action.data.forEach((d) => {
                        draft.myRooms.push(d);
                    });
                }
                draft.hasMoreMyRooms = !action.last;
                break;
            }
            case LOAD_MY_ROOMS_FAILURE: {
                break;
            }

            // 카테고리 별 스터디방 리스트 ///////////////////////////////
            case LOAD_ROOMS_BY_CATEGORY_REQUEST : {
                draft.roomsByCategory = draft.hasMoreRoomsByCategory ? draft.roomsByCategory : [];
                break;
            }
            case LOAD_ROOMS_BY_CATEGORY_SUCCESS: {
                if(action.first) {
                    draft.roomsByCategory = action.data;
                }else {
                    action.data.forEach((d) => {
                        draft.roomsByCategory.push(d);
                    });
                }
                draft.hasMoreRoomsByCategory = !action.last;
                break;
            }
            case LOAD_ROOMS_BY_CATEGORY_FAILURE: {
                break;
            }

            // 인기 스터디방 리스트 ///////////////////////////////
            case LOAD_POPULAR_ROOMS_REQUEST : {
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
            case LOAD_RECENTLY_CREATED_ROOMS_REQUEST : {
                draft.recentlyCreatedRooms = [];
                break;
            }
            case LOAD_RECENTLY_CREATED_ROOMS_SUCCESS : {
                draft.recentlyCreatedRooms = action.data;
                break;
            }
            case LOAD_RECENTLY_CREATED_ROOMS_FAILURE: {
                break;
            }

            // 스터디방 뷰
            case LOAD_ROOM_DETAIL_REQUEST :{
                draft.loadingRoomDetail = true;
                draft.roomDetail = {};
                break;
            }
            case LOAD_ROOM_DETAIL_SUCCESS :{
                draft.roomDetail = action.data;
                draft.loadingRoomDetail = false;
                break;
            }
            case LOAD_ROOM_DETAIL_FAILURE :{
                draft.loadingRoomDetail = false;
                break;
            }

            // 스터디방 가입
            case JOIN_ROOM_REQUEST :{
                draft.isJoiningRoom = true;
                draft.joinedRoom = false;
                draft.joinRoomErrorReason = '';
                break;
            }
            case JOIN_ROOM_SUCCESS :{
                draft.isJoiningRoom = false;
                draft.joinedRoom = true;
                break;
            }
            case JOIN_ROOM_FAILURE :{
                draft.isJoiningRoom = false;
                draft.joinedRoom = true;
                draft.joinRoomErrorReason = action.error;
                break;
            }

            default: {
                break;
            }
        }
    });
};

export default room;