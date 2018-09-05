using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using AspSpaCrudVue.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Newtonsoft.Json;

namespace AspSpaCrudVue.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        string connString = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Source\\ERSWebApp\\ESRWebApp\\ERSWebAppDB.mdf;Integrated Security=True";

        [HttpGet]
        [Route("GetEmployees")]
        public List<Employee> GetEmployees()
        {
            //InitialiseEmployees();
            string query = "SELECT * FROM EmployeeTable;";
            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    conn.Open();
                    return new List<Employee>(conn.Query<Employee>(query).ToList());
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine(ex);
                    return new List<Employee>();
                }
            }
        }

        [HttpPost]
        [Route("Create")]
        public int Create()
        {
            Employee employee = new Employee();
            using (StreamReader sr = new StreamReader(Request.Body))
            {
                employee = JsonConvert.DeserializeObject<Employee>(sr.ReadToEnd());
            }
            if (employee != null)
            {
                string query = "INSERT INTO EmployeeTable (Id, Name, Role, Skill) " +
                "VALUES (@Id, @Name, @Role, @Skill);";
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    try
                    {
                        conn.Open();
                        return conn.Execute(query, employee);
                    }
                    catch (Exception ex)
                    {
                        System.Diagnostics.Debug.WriteLine(ex);
                        return -1;
                    }
                }
            }
            else
            {
                return -1;
            }
        }

        [HttpGet("{id}")]
        [Route("GetById")]
        public Employee GetById(int id)
        {
            string query = "SELECT * FROM EmployeeTable WHERE Id=@Id;";
            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    conn.Open();
                    return conn.QuerySingle<Employee>(query, new { id });
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine(ex);
                    return null;
                }
            }
        }

        [HttpPut]
        [Route("Update")]
        public int Update()
        {
            Employee employee = new Employee();
            using (StreamReader sr = new StreamReader(Request.Body))
            {
                employee = JsonConvert.DeserializeObject<Employee>(sr.ReadToEnd());
            }
            if (employee != null)
            {
                System.Diagnostics.Debug.WriteLine(employee.Skill);
                string query = "UPDATE EmployeeTable SET Name=@Name, Role=@Role, Skill=@Skill WHERE Id=@Id;";
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    try
                    {
                        conn.Open();
                        return conn.Execute(query, employee);
                    }
                    catch (Exception ex)
                    {
                        System.Diagnostics.Debug.WriteLine(ex);
                        return -1;
                    }
                }
            }
            else
            {
                return -1;
            }
        }

        [HttpDelete("{id}")]
        [Route("Delete")]
        public int Delete(int id)
        {
            if (id > 0)
            {
                string query = "DELETE FROM EmployeeTable WHERE Id=@Id;";
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    try
                    {
                        conn.Open();
                        return conn.Execute(query, new { id });
                    }
                    catch (Exception ex)
                    {
                        System.Diagnostics.Debug.WriteLine(ex);
                        return -1;
                    }
                }
            }
            else
            {
                return -1;
            }
        }

        private void InitialiseEmployees()
        {
            string query = "INSERT INTO EmployeeTable (Id, Name, Role, Skill) " +
                "VALUES (@Id, @Name, @Role, @Skill);";

            List<Employee> employees = new List<Employee>();
            for (int i = 1; i < 11; i++)
            {
                employees.Add(new Employee()
                {
                    Id = i,
                    Name = "Employee " + i,
                    Role = "Role " + i,
                    Skill = "Skill " + i
,
                });
            }
            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    conn.Open();
                    conn.Execute(query, employees);
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine(ex);
                }
            }
        }
    }
}
