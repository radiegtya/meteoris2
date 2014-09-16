package com.rjfun.cordova.httpd;

import java.io.IOException;

import android.content.res.AssetManager;

public class WebServer extends NanoHTTPD
{
	public WebServer(int port, AndroidFile wwwroot, String cordovaRoot, AssetManager assetManager ) throws IOException {
		super(port, wwwroot, cordovaRoot, assetManager);
	}
}
