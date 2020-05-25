using System.Collections.Generic;

namespace FileUploader.Infrastructure
{
    public class FileConstraintsOptions
    {
        public List<string> Extensions { get; set; }
        public int MaximumSizeBytes { get; set; }
    }
}
