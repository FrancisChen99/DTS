package dts.mesg.maintain.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import dts.mesg.maintain.service.MaintainCaseService;
import dts.model.entity.Dept;
import dts.model.entity.MaintainCase;


@PropertySource(ignoreResourceNotFound = true, value = "classpath:data.properties", encoding = "UTF-8")
@Controller
@RequestMapping("/MaintainCase")
public class MaintainCaseController {

  /** Logger */
  private Logger logger = LogManager.getLogger(MaintainCaseController.class);

  @Autowired
  private MaintainCaseService maintaincaseService;
  
  @RequestMapping(value="/",method=RequestMethod.GET)
  public @ResponseBody ModelAndView startMaintainCase(ModelAndView model) {
    return model;
  }

  @RequestMapping(value="/new",method=RequestMethod.GET)
  public @ResponseBody ModelAndView addMaintainCase(ModelAndView model) {

    model.addObject(new MaintainCase());
    model.addObject("view", "new");
    model.addObject("deptlist", getDeptlist());
    model.setViewName("MaintainCase");
    return model;
  }
  
  @RequestMapping(value="/conditions",method=RequestMethod.GET)
  public @ResponseBody ModelAndView conditionMaintainCase(ModelAndView model) {

    model.addObject("view", "conditions");
    model.setViewName("MaintainCase");
    return model;
  }

  @RequestMapping(value = "/new", params = {}, method = RequestMethod.POST)
  public ModelAndView saveMaintainCase(
      @ModelAttribute("mCase")MaintainCase mCase,
      @RequestParam("unit1") String inputUnit,
      @RequestParam(name = "act", required = false) String act,
      ModelMap modelMap) {

	act = (act == null) ? "" : act.trim();
    DateFormat dateFormat = new SimpleDateFormat("yyyyMMddhhmmss");
    Date date = new Date();
    ModelAndView model = new ModelAndView();
    List<MaintainCase> querycase = new LinkedList<MaintainCase>();
    boolean incomplete=true;

    logger.info("########################################");
    logger.info("                報修單填寫");
    logger.info("########################################");

    // 檢查資料是否完整
    logger.info("*************o 檢查資料是否完整 o************");
    if(mCase.fetchUnit().isEmpty() && inputUnit.isEmpty()) logger.info("      報修單位未填");
    else if(mCase.fetchName().isEmpty())                   logger.info("      聯絡人未填");
    else if(mCase.fetchRbtime().isEmpty())                 logger.info("      報修/回覆開始時問未填");
    else if(mCase.fetchProblem().isEmpty())                logger.info("      問題描述未填");
    else if(mCase.fetchStatus().isEmpty())                 logger.info("      狀態未填");
    else incomplete=false;

    // 報修單位
    if(mCase.fetchUnit().isEmpty()) {
        if(!inputUnit.isEmpty())    
        	mCase.setUnit(inputUnit);
    } else {
    	mCase.setUnit(mCase.fetchUnit());
    }

    //設定
    mCase.setPROCESSDESC(mCase.fetchProcess().trim().replaceAll("\n\r", ""));
    mCase.setPROBLEMDESC(mCase.fetchProblem().trim().replaceAll("\n\r", ""));
    mCase.setPROCESSTIME(hourConvertor(mCase.fetchArrivaltime(), mCase.fetchFinishtime()));
    mCase.setCOMMUTETIME(hourConvertor(mCase.fetchDepaturetime(), mCase.fetchArrivaltime()));
    
    if(act.matches("update")) {
    	mCase.setUdate(dateFormat.format(date));
    	mCase.setLuser("system");    
    } else {
    	mCase.setSerial(newSerial());
        mCase.setEdate(dateFormat.format(date));
        mCase.setLuser("creator");
    }

    if(incomplete) {
      model.addObject("msg", "報修單資料未填完整, 請重新輸入");
      logger.info("xxxxxxxxxxxxxx 以上資料未填寫  xxxxxxxxxxxxxx");
    } else {
      // 儲存資料
      maintaincaseService.save(mCase);
      // 確認資料已儲存資料庫
      querycase = maintaincaseService.findAllBysERIAL(mCase.fetchSerial());
      if(querycase.isEmpty()) {
        model.addObject("msg", "報修單(儲存/更新)失敗, 請重新輸入");
        logger.info("xxxxxxxxxxxxxxx 資料存取失敗 xxxxxxxxxxxxxxx");
      } else {
    	  if(!act.matches("update")) model.addObject("msg", "報修單(儲存/更新)成功, 報修單號:   " + mCase.fetchSerial());
        logger.info("**************o 資料儲存成功 o**************");
        logger.info("報修單號:   " + mCase.fetchSerial());
      }
    }
    
    if(act.matches("update")) {
    	model.setViewName("redirect:/MaintainCase/query?serial=" + mCase.fetchSerial());
    } else {
    	modelMap.addAttribute("mCase", new MaintainCase());
        model.addObject("view", "new");
        model.addObject("deptlist", getDeptlist());
        model.setViewName("MaintainCase");
    }
    return model;
  }
  
  @RequestMapping(value="/edit", params = {}, method = RequestMethod.GET)
  public @ResponseBody ModelAndView editMaintainCase(
      @RequestParam(name = "serial", required = false) String serial,
      ModelAndView model) {

    List<MaintainCase> listRcord = new LinkedList<MaintainCase>();
    listRcord = maintaincaseService.findAllBysERIAL(serial);
    model.addObject("view", "edit");
    model.addObject("deptlist", getDeptlist());
    model.addObject("listRecord", listRcord);
    model.setViewName("MaintainCase");
    return model;
  }

  @RequestMapping(value="/query", params = {}, method = RequestMethod.POST)
  public @ResponseBody ModelAndView query1MaintainCase(
      @RequestParam("serial") String serial,
      @RequestParam("unit") String unit,
      @RequestParam("date") String date,
      ModelAndView model) {

    List<MaintainCase> listRcord = new LinkedList<MaintainCase>();

    serial = (serial == null) ? "" : serial.trim();
    unit = (unit == null) ? "" : unit.trim();
    date = (date == null) ? "" : date.trim();
    logger.info("########################################");
    logger.info("                報修記錄查詢");
    logger.info("########################################");
    if(!unit.isEmpty()) logger.info("報修編號:   " + unit);
    if(!date.isEmpty()) logger.info("報修日期:   " + date);

    listRcord = maintaincaseService.findAllBysERIALuNITdATE(serial, unit, date);

    model.addObject("unit", unit);
    model.addObject("date", date);
    model.addObject("view", "list");
    model.addObject("listRecord", listRcord);
    model.setViewName("MaintainCase");
    return model;
  }
  
  @RequestMapping(value="/query", params = {}, method = RequestMethod.GET)
  public @ResponseBody ModelAndView queryMaintainCase(
	  @RequestParam(name="serial", required = false) String serial,
      @RequestParam(name="unit", required = false) String unit,
      @RequestParam(name="date", required = false) String date,
      ModelAndView model) {

    List<MaintainCase> listRcord = new LinkedList<MaintainCase>();
    serial = (serial == null) ? "" : serial.trim();
    unit = (unit == null) ? "" : unit.trim();
    date = (date == null) ? "" : date.trim();
    listRcord = maintaincaseService.findAllBysERIALuNITdATE(serial, unit, date);

    model.addObject("view", "list");
    model.addObject("unit", unit);
    model.addObject("date", date);
    model.addObject("listRecord", listRcord);
    model.setViewName("MaintainCase");
    return model;
  }

  @RequestMapping(value="/print", params = {}, method = RequestMethod.GET)
  public @ResponseBody ModelAndView printMaintainCase(
      @RequestParam(name = "serial", required = false) String serial,
      ModelAndView model) {

    List<MaintainCase> listRcord = new LinkedList<MaintainCase>();
    listRcord = maintaincaseService.findAllBysERIAL(serial);
    model.addObject("view", "print");
    model.addObject("listRecord", listRcord);
    model.setViewName("MaintainCase");
    return model;
  }

  private String newSerial() {

    String serial="";
    // get day
    DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
    Date date = new Date();
    List<MaintainCase> list = maintaincaseService.findAllByDate(dateFormat.format(date));
    // Get new serial number
    if (list.size() > 0) {
      MaintainCase m = list.get(0);
        serial="MA"+(Long.parseLong(m.fetchSerial().substring(2))+1);
    } else {
      serial="MA"+dateFormat.format(date)+"001";
    }
    return serial;
  }

  private List<String> getDeptlist() {

    List<String> deptlist = new LinkedList<String>();
    List<Dept> list = maintaincaseService.findAllBygRADE("3");
    for(Dept dept: list)
    deptlist.add(dept.getDEPTNAME());
    return deptlist;
  }

  private String hourConvertor(String sDate, String eDate) {

    long secondsInMilli = 1000;
    long minutesInMilli = secondsInMilli * 60;
    long hoursInMilli = minutesInMilli * 60;
    long daysInMilli = hoursInMilli * 24;
    float hour = 0;

    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm");
    DecimalFormat df=new DecimalFormat("#.##");
    try {
      Date sdate = simpleDateFormat.parse(sDate);
      Date edate = simpleDateFormat.parse(eDate);
      long different = edate.getTime() - sdate.getTime();
      hour = (float)different / hoursInMilli;
    } catch (ParseException e) {
      logger.info(e.getMessage());
    }
    return df.format(hour);
  }

  private String ValidPath(String outputDir) throws UnsupportedEncodingException {

    File f = new File(outputDir);
    if (!f.isAbsolute()) {
      String execPath = System.getProperty("user.dir");
      if (execPath.toUpperCase().contains("TOMCAT")) {
        f = new File(execPath);
        String a[] = this.getClass().getResource("").getPath().split("/WEB-INF/");
        String b[]= a[0].split("webapps");
        execPath = f.getParent() + File.separator + "webapps" + b[1];
        outputDir = execPath + File.separator + outputDir;
      } else {
        outputDir = execPath + File.separator + outputDir;
      }
      f = new File(outputDir);
    }
    if (!f.exists())
      f.mkdirs();
    return outputDir + File.separator;
  }

  private void copyFile(File source, File dest) throws IOException {

    java.io.InputStream fis = null;
    java.io.OutputStream fos = null;
    try {
      fos = new java.io.FileOutputStream(dest);
      fis = new java.io.FileInputStream(source);
      byte[] b = new byte[1024];
      int off = 0;
      int len = 0;
      while ((len = fis.read(b)) != -1) {
        fos.write(b, off, len);
      }
      fos.flush();
    } catch (java.io.IOException ioe) {
      throw ioe;
    } finally {
      fos.close();
      fis.close();
    }
  }

}

