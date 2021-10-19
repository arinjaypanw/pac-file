function FindProxyForURL(url, host) { 
    /* Bypass localhost and Private IPs */ 
    var resolved_ip = dnsResolve(host);
    if (isPlainHostName(host) || 
    shExpMatch(host, "*.local") || 
    isInNet(host, "10.0.0.0", "255.0.0.0") || 
    isInNet(host, "172.16.0.0",  "255.240.0.0") || 
    isInNet(host, "192.168.0.0",  "255.255.0.0") || 
    isInNet(host, "127.0.0.0", "255.255.255.0")) 
    return "DIRECT"; 
    /* Bypass FTP */ 
    if (url.substring(0,4) == "ftp:") 
        return "DIRECT"; 
    /* Bypass SAML, e.g. Okta */ 
    if (shExpMatch(host, "*.okta.com") || shExpMatch(host, "*.oktacdn.com")) 
        return "DIRECT"; 
        /* Bypass ACS */ 
    if (shExpMatch(host, "*.acs.prismaaccess.com")) 
        return "DIRECT"; 
    /* Forward to Prisma Access */ 
    return "PROXY arinjaylab.proxy.lab.prismaaccess.com:8080";
}
