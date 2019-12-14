package dts.utils;

import java.io.IOException;
import java.io.InputStream;
import java.net.SocketException;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * 實現FTP文件上傳和文件下載
 */
public class FtpUtil {
	
	private static Logger logger = LogManager.getLogger(FtpUtil.class);
    private static FTPClient ftpClient = new FTPClient();
    private static String encoding = System.getProperty("file.encoding");
    /**
     * Description: 向FTP服務器上傳文件
     * 
     * @Version1.0
     * @param url FTP服務器hostname
     * @param port FTP服務器端口
     * @param username FTP登錄賬號
     * @param password FTP登錄密碼
     * @param path FTP服務器保存目錄,如果是根目錄則為“/”
     * @param filename 上傳到FTP服務器上的文件名
     * @param input 本地文件輸入流
     * @return 成功返回true，否則返回false
     */
    public static boolean uploadFile(String url, int port, String username, String password, String path, String filename, InputStream input) {
        
    	boolean result = false;
        try {
            int reply;
            // 如果采用默認端口，可以使用ftp.connect(url)的方式直接連接FTP服務器
            //ftpClient.connect(url);
            ftpClient.connect(url, port);
            // 登錄
            ftpClient.login(username, password);
            ftpClient.setControlEncoding(encoding);
            // 檢驗是否連接成功
            reply = ftpClient.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
				logger.info("未連接到FTP，用户名或密碼錯誤。");
				ftpClient.disconnect();
				return result;
			} else {
				logger.info("FTP連接成功。");
                // 轉移工作目錄至指定目錄下
                ftpClient.changeWorkingDirectory(path);
        	    ftpClient.setBufferSize(1024);
        	    ftpClient.setControlEncoding("UTF-8");
        	    //設置被動模式
        	    ftpClient.enterLocalPassiveMode();
        	    //設置文件類型（二進制） 
        	    ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
        	    if(ftpClient.storeFile(filename, input)){
        		   logger.info(filename + " 上傳成功!");
        		   result = true;
        	    } else {
        		   logger.info(filename +  " 上傳失敗!");
        	    }
        	    input.close();
                ftpClient.logout();
                ftpClient.disconnect();
			}
        } catch (SocketException e) {
			e.printStackTrace();
			logger.info("FTP的IP地址可能錯誤，請正確配置。");
        } catch (IOException e) {
        	logger.info("FTP的端口錯誤，請正確配置。");
        	logger.info(e.getMessage() + " " + url);
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException ioe) {
                	logger.info(ioe.getMessage());
                }
            }
        }
        return result;
    }
}
