<?php
    function getRealIpAddr(){
        if ( !empty($_SERVER['HTTP_CLIENT_IP']) ) {
        // Check IP from internet.
        $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']) ) {
        // Check IP is passed from proxy.
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
        // Get IP address from remote address.
        $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
   }

function getRequestHeaders() {
    $headers = array();
    foreach($_SERVER as $key => $value) {
        if (substr($key, 0, 5) <> 'HTTP_') {
            continue;
        }
        $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
        $headers[$header] = $value;
    }
    return $headers;
}

   echo getRealIpAddr();
   echo "<br/>\n";
   
   # $headers = getRequestHeaders();
   $headers = apache_request_headers();

   foreach ($headers as $header => $value) {
       echo "$header: $value <br />\n";
   }

?>