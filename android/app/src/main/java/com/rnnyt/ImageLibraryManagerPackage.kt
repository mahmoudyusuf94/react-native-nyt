package com.rnnyt

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import java.util.*

/**
 * Created by Mahmoud Yusuf on 28/02/19.
 * https://github.com/mahmoudyusuf94
 * mahmoud.yusuf94@gmail.com
 */

class ImageLibraryManagerPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext?): MutableList<NativeModule> {
        reactContext?.let {
            return mutableListOf(ImageLibraryManager(it));
        }
        return Collections.emptyList()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext?): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return Collections.emptyList()
    }

}