package com.example.project.utility;

import jakarta.servlet.http.HttpServletRequest;

public class SiteUrlFinder {

  public static String getSiteURL(HttpServletRequest request) {
    String siteURL = request.getRequestURL().toString();
    return siteURL.replace(request.getServletPath(), "");
  }
}
