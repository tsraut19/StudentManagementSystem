using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Models;

public class Student
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public string Course { get; set; }
}
