import axios from 'axios';

// 定义用户数据类型接口
export interface Songs {
	// code: number;
	// data: object;
}

// 获取用户列表
export const getSongs = async (): Promise<Songs> => {
	try {
		const response = await axios.get('/api/x/web-interface/view?bvid=BV1BM411k7MS');
		return response.data as Songs;
	} catch (error) {
		console.error('Error fetching songs:', error);
		return error as Songs;
	}
};
