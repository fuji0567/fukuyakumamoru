import Ionicons from '@expo/vector-icons/Ionicons';
import { loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen"
import { useState, useEffect } from "react"

export function useLoadedAssets() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    //アプリをレンダリングする前に、必要なリソースやデータをロードする
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                //ロードするまでの間にスプラッシュ画面を表示する
                SplashScreen.preventAutoHideAsync();
                //フォントのダウンロード
                await loadAsync(Ionicons.font);
            } catch (e) {
                //このエラー情報をエラー報告サービスに提供する
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                //スプラッシュ画面を表示しなくする
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, [])

    return isLoadingComplete
}
