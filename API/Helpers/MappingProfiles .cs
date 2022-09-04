using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {

        public MappingProfiles()
        {
            // CreateMap<Products, ProductToReturnDto>()
            //    .ForMember(d => d.Warehouse, o => o.MapFrom(s => s.));    
               
                     
                 
        }

        
    }
}