import axios from 'axios';

const instance = axios.create({
	baseURL: '/api', // 更改为您的 API 基本路径
	timeout: 5000
	// 其他可选配置
});

export default instance;
