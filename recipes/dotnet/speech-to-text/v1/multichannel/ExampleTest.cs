using System.Diagnostics;
using Xunit;

public class ExampleTest
{
    [Fact]
    public void ExampleRunsAndProducesOutput()
    {
        var dir = Path.GetDirectoryName(typeof(ExampleTest).Assembly.Location)!;
        var projectDir = Path.GetFullPath(Path.Combine(dir, "..", "..", "..", ".."));

        var psi = new ProcessStartInfo("dotnet", "run")
        {
            WorkingDirectory = projectDir,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
        };

        using var process = Process.Start(psi)!;
        var stdout = process.StandardOutput.ReadToEnd();
        var stderr = process.StandardError.ReadToEnd();
        process.WaitForExit(60_000);

        var debug = $"dir={dir}\nprojectDir={projectDir}\nexitCode={process.ExitCode}\nstdout={stdout}\nstderr={stderr}";
        Assert.True(process.ExitCode == 0, debug);
        Assert.True(stdout.Trim().Length > 0, debug);
    }
}