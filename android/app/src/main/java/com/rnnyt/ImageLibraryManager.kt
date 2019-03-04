package com.rnnyt

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

/**
 * Created by Mahmoud Yusuf on 28/02/19.
 * https://github.com/mahmoudyusuf94
 * mahmoud.yusuf94@gmail.com
 */

class ImageLibraryManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var callback: Callback? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun onNewIntent(intent: Intent?) {
    }

    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        val filePath = data?.dataString
        callback?.invoke(filePath)
    }

    override fun getName(): String {
        return "ImageLibraryManager"
    }

    @ReactMethod
    fun selectImage(callback: Callback){
        val currentActivity = currentActivity;
        val libraryIntent = Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        currentActivity?.startActivityForResult(libraryIntent, 1);
        this.callback = callback
    }



}