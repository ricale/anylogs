import AsyncStorage from '@react-native-community/async-storage';

namespace LocalStorage {
    export async function get (key: string) {
        return await AsyncStorage.getItem(key);
    };
      
    export async function set (key: string, val: number): Promise<void>;
    export async function set (key: string, val: string): Promise<void>;
    export async function set (key: string, val: any) {
        await AsyncStorage.setItem(key, `${val}`);
    };
      
    export async function getJson (key: string) {
        const item = await AsyncStorage.getItem(key);
        if(item === null) {
            return null;
        }
        return JSON.parse(item);
    };

    export async function setJson (key: string, val: any) {
        await AsyncStorage.setItem(key, JSON.stringify(val));
    };
}

export default LocalStorage;
