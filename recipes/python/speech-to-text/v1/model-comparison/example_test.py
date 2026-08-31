import subprocess
from pathlib import Path


def test_example_runs():
    """Runs the model-comparison example and verifies it produces output."""
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
    assert "nova-3" in result.stdout, "Expected nova-3 results in output"
    assert "nova-2" in result.stdout, "Expected nova-2 results in output"
