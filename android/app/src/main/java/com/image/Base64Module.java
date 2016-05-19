package com.myapp.imagepicker;

import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class Base64Module extends ReactContextBaseJavaModule {
    public ImagePickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

     @ReactMethod
	public static String encodeToBase64(String )
	{
		Bitmap.CompressFormat compressFormat = Bitmap.CompressFormat.JPEG;
		int quality = 100;

		Bitmap image = BitmapFactory.decodeFile(path);
	    ByteArrayOutputStream byteArrayOS = new ByteArrayOutputStream();
	    image.compress(compressFormat, quality, byteArrayOS);
	    image.recycle();
		 = null; 
	    return Base64.encodeToString(byteArrayOS.toByteArray(), Base64.DEFAULT);
	}

	 @ReactMethod
	public static Bitmap decodeBase64(String input)
	{
	    byte[] decodedBytes = Base64.decode(input, 0);
	    return BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
	}
}