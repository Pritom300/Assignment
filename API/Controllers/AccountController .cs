using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController  :  ControllerBase
    {

        private readonly DataContext _context;
        

        public AccountController ( DataContext context)
        {
            _context = context;
        }

        


        [HttpPost("register")]
        public async Task <ActionResult<User>> Register(RegisterDto registerDto)
        {

            var user = new User
            {
                UserName = registerDto.Username,
                Password = registerDto.Password
                
            };

             _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return Ok();
        }




        [HttpPost("login")]
        public async Task <ActionResult<User>>Login(LoginDto loginDto)
        {
            if (loginDto.Username is null)
            {
                return BadRequest("Invalid client request");
            }

            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (loginDto.Username == user.UserName && loginDto.Password == user.Password)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim> 
                { 
                    new Claim(ClaimTypes.Name, loginDto.Username), 
                    new Claim(ClaimTypes.Role, "Student") 
                };

               
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                return Ok(new { Token = tokenString });
            }

            return Unauthorized();
        }
        }



        
}




        
 
 


