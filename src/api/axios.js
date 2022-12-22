import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080' //서버 링크 (baseURL을 이곳에 넣습니다.)
});