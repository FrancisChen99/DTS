# DTS Project Description
<p>
The main purpose makes FireFighters get the lastest information to understand the accident surrounding on the Map and help them make the better decision for saving lives. 
</p>

 
# Skill
<pre><code>
  Languages:  Java, JavaScript, SQL
  Framework:  Spring Boot 2.0
  API:        JPA, REST
  Web Server: Apache Tomcat 7/8/9
  Database:   Oracle 10g
  Tool:       Eclipse, SQL Developer, Postman, Subversion
  Others:     Mavin
  OS:         Windows 10, Linux (Remote Server)
</code></pre>

# Project Structure
<pre><code>
DTS
 |-[src]
    |-[main]
       |-[java]
       |   |-[dts]
       |     |-[mesg]
       |     |  |-[maintan]
       |     |     |-[controller]   --> Controller 為頁面控制層, method 有 GET/POST/PUT/DELETE
       |     |     |  |-MaintainCaseController.java
       |     |     |  |- ...
       |     |     |-[service]      --> Service 為業務邏輯運算層, 數據是 Repostiory 程式提供
       |     |        |-MaintainCaseService.java
       |     |        |- ...
       |     |-[model]              --> Model 為資料實體設定層 Data Structure
       |     |  |-[entity]          
       |     |     |-Dept.java       
       |     |     |-MaintainCase.java
       |     |     |- ...   
       |     |-[repository]        --> Repository 為數據擷取層 exten CrudRepository
       |        |-DeptRepository.java
       |        |-MaintainCaseRepository.java
       |        |- ...
       |-[resources]               --> 放置所有配置檔
          |-[static]               --> 放置CSS,JS, image檔案
          |-[templates]            --> 放置網頁檔案
          |-application.properties --> 設定檔, 如: server PORT/Database URLs
       |-[webapp]
          |-[_mdsWebPage]          --> 客制配置資料夾
             |-css
             |-js
             |-img
          |-[WEB-INF]
             |-[jsp]
                |-MaintainCase.jsp --> 前端網頁
</code></pre>