package dts.utils;

import java.io.UnsupportedEncodingException;
import java.security.Security;
import java.util.Arrays;
import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

public class Cmo64Utils {
	
	private static String Key="1qaz2wsx";
    public static boolean printOutFlag=false;
    private static Logger logger = LogManager.getLogger(Cmo64Utils.class);

    //加密
    public static String encode(String stringToEncode){
      try {
          SecretKeySpec skeySpec = getKey(Key);
          //logger.info("stringToEncode="+stringToEncode);
          byte[] clearText = stringToEncode.getBytes("UTF-8");
          //logger.info("clearText.length="+clearText.length);
          final byte[] iv = new byte[16];
          Arrays.fill(iv, (byte) 0x00);
          IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);
          Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding");
          cipher.init(Cipher.ENCRYPT_MODE, skeySpec, ivParameterSpec);
          return (new sun.misc.BASE64Encoder()).encode(cipher.doFinal(clearText));
          //return Arrays.toString(cipher.doFinal(clearText));
      } catch (Exception e) {
          logger.error("加密錯誤:"+(stringToEncode.length()>100?stringToEncode.substring(0,100)+"...":stringToEncode),e);
          System.out.println("加密錯誤:"+(stringToEncode.length()>100?stringToEncode.substring(0,100)+"...":stringToEncode));
          e.printStackTrace();
      }

      return "";
  }
    private static SecretKeySpec getKey(String password) throws UnsupportedEncodingException {
        int keyLength = 256;
        byte[] keyBytes = new byte[keyLength / 8];
        Arrays.fill(keyBytes, (byte) 0x0);
        byte[] passwordBytes = password.getBytes("UTF-8");
        int length = passwordBytes.length < keyBytes.length ? passwordBytes.length : keyBytes.length;
        System.arraycopy(passwordBytes, 0, keyBytes, 0, length);
        Security.addProvider(new BouncyCastleProvider());
        SecretKeySpec key = new SecretKeySpec(keyBytes, "AES");
        return key;

    }
}


