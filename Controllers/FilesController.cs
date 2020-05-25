using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using FileUploader.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FileUploader.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IOptions<FileConstraintsOptions> _fileConstraints;

        public FilesController(IOptions<FileConstraintsOptions> allowedFiles)
        {
            this._fileConstraints = allowedFiles;
        }

        [HttpGet("constraints")]
        public async Task<IActionResult> GetFileConstraints()
        {
            return Ok(_fileConstraints.Value);
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Post()
        {
            var files = Request.Form.Files;
            foreach (var file in files)
            {
                var extension = file.FileName.Split(new char[] { '.' }).Last();
                if (!_fileConstraints.Value.Extensions.Contains(extension))
                    return BadRequest("Not appropriate file extension");

                if (file.Length > _fileConstraints.Value.MaximumSizeBytes)
                    return BadRequest("File is too big");

                if (file. Length <= 0)
                    return BadRequest("File is empty");

                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), Constants.UploadsFolderName);

                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(Constants.UploadsFolderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }                
            }
            
            return Ok(new { Message = string.Join(", ", files.Select(f => f.FileName)) + " succesfully uploaded." });
        }
    }
}