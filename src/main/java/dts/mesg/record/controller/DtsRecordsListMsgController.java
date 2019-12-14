package dts.mesg.record.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import dts.model.entity.DtsRecord;
import dts.mesg.record.service.DtsRecordsListService;
import org.springframework.util.ResourceUtils;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;

/**
 * The entrance to DtsRecordsListMsgController.
 *
 * @params prog, date
 * @return dtsRecord.jsp
 *
 * @author Francis
 * @version 1.0
 */
@RestController
@RequestMapping("/records")
public class DtsRecordsListMsgController {

	/** Logger */
	private Logger logger = LogManager.getLogger(DtsRecordsListMsgController.class);
	private Properties properties = new Properties();

	@Autowired
	private DtsRecordsListService dtsRecordsListService;

	@RequestMapping(params = {}, method = RequestMethod.GET)
	public @ResponseBody ModelAndView ULD_detailGet(
			@RequestParam(name = "prog", required = false) String prog,
			@RequestParam(name = "date", required = false) String date, 
			ModelAndView model) {

		List<DtsRecord> listRcord = new LinkedList<DtsRecord>();
		List<DtsRecord> r_list;
		Map<String, String> map = fetchProperties();

		prog = (prog == null) ? "" : varifyProg(map, prog.trim());
		date = (date == null) ? "" : date.trim();
		logger.info("########################################");
		logger.info("             服務程式執行記錄查詢");
		logger.info("########################################");
		logger.info("程式名稱:   " + prog);
		logger.info("執行日期:   " + date);

		if (date.length() > 0 && date.length() < 8) {
			logger.info("********** date 不足八碼 (YYYYMMDD) **********");
			model.addObject("msg", "參數 date 不足八碼 (YYYYMMDD)");
			model.setViewName("dtsRecord");
			return model;
		} else if (date.length() > 8) {
			date = (date.length() == 8) ? date : date.substring(0, 8);
			if (!date.matches("[0-9]")) {
				logger.info("********** date 格式應為 YYYYMMDD **********");
				model.addObject("msg", "參數 date 格式應為 YYYYMMDD");
				model.setViewName("dtsRecord");
				return model;
			}
		}

		/*
		 * Get data :
		 * option 1. catch data by prog and date.
		 * option 2. catch data byprog
		 * option 3. catch all data
		 */

		if (!prog.isEmpty())
			r_list = (!date.isEmpty()) ? dtsRecordsListService.findByKindAndUpdatetime(prog, date) : dtsRecordsListService.findAllByKind(prog);
		else if (prog.isEmpty() && !date.isEmpty())
			r_list = dtsRecordsListService.findByUpdatetime(date);
		else
			r_list = dtsRecordsListService.findAllData();

		for (DtsRecord record : r_list) {
			record.setUPDATETIME(formatDate(record.getUPDATETIME()));
			// Object 中沒有中文名稱欄位, 所以使用 city 替代
			record.setCITY(this.properties.getProperty(record.getKIND()));
			listRcord.add(record);
		}
		logger.info("筆數 : " + r_list.size());
		r_list.clear();

		model.addObject("listRecord", listRcord);
		model.setViewName("dtsRecord");
		return model;
	}

	private Map<String, String> fetchProperties() {

		Map<String, String> map = new HashMap<String, String>();
		try {
			File file = ResourceUtils.getFile("classpath:prog_name_mapping.properties");
			InputStreamReader in = new InputStreamReader(new FileInputStream(file), "UTF-8");
			properties.load(in);

			Enumeration<?> en = properties.propertyNames();
			while (en.hasMoreElements()) {
				String key = (String) en.nextElement();
				String value = properties.getProperty(key);
				map.put(key, value);
			}
		} catch (IOException e) {
			logger.info("********** " + e.getMessage() + " **********");
		}
		return map;
	}

	private String varifyProg(Map<String, String> map, String prog) {

		String p = prog;
		for (Entry<String, String> e : map.entrySet()) {
			if (e.getKey().matches(prog)) {
				p = prog;
				break;
			} else if (e.getValue().matches(prog)) {
				p = e.getKey();
				break;
			} else {
				p = "";
			}
		}
		return p;
	}

	private String formatDate(String inDate) {

		SimpleDateFormat inSDF = new SimpleDateFormat("yyyyMMddHHmmss");
		SimpleDateFormat outSDF = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String outDate = "";
		if (inDate != null) {
			try {
				Date date = inSDF.parse(inDate);
				outDate = outSDF.format(date);
			} catch (ParseException ex) {
				logger.info("********** " + inDate + " 不符合日期格式 yyyymmddhhmiss **********");
			}
		}
		return outDate;
	}
}
