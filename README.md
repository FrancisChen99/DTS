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
  Others:     Mavin, CRUD
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
       |     |     |-[controller]   --> Controller , method  GET/POST/PUT/DELETE
       |     |     |  |-MaintainCaseController.java
       |     |     |  |- ...
       |     |     |-[service]      --> Service ,  Repostiory 
       |     |        |-MaintainCaseService.java
       |     |        |- ...
       |     |-[model]              --> Model  Data Structure
       |     |  |-[entity]          
       |     |     |-Dept.java       
       |     |     |-MaintainCase.java
       |     |     |- ...   
       |     |-[repository]        --> Repository  exten CrudRepository
       |        |-DeptRepository.java
       |        |-MaintainCaseRepository.java
       |        |- ...
       |-[resources]               --> 
          |-[static]               --> CSS,JS, image
          |-[templates]            --> 
          |-application.properties --> , : server PORT/Database URLs
       |-[webapp]
          |-[_mdsWebPage]          --> 
             |-css
             |-js
             |-img
          |-[WEB-INF]
             |-[jsp]
                |-MaintainCase.jsp --> 
       |-POM.XML                   --> Mavin : Spring Boot configuration, dependency, etc.
<code></pre>