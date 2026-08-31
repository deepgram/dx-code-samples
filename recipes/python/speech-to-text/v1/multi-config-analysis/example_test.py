import subprocess
from pathlib import Path

def test_example_runs():
    """Runs the multi-config analysis example and verifies it produces output."""
    example = Path(__file__).parent / "example.py"
    result = subprocess.run(
        ["python", str(example)],
        capture_output=True,
        text=True,
        timeout=120,
    )
    assert result.returncode == 0, (
        f"Example failed\nSTDOUT: {result.stdout}\nSTDERR: {result.stderr}"
    )
    assert result.stdout.strip(), "Example produced no output"
    assert "[Config 1" in result.stdout, "Missing Config 1 output"
    assert "[Config 2" in result.stdout, "Missing Config 2 output"
    assert "[Config 3" in result.stdout, "Missing Config 3 output"
