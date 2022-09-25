fix_versions:
	pip-compile --extra=dev -o requirements-dev.txt pyproject.toml
	pip-compile -o requirements.txt pyproject.toml

install:
	. venv/bin/activate && pip install -r requirements-dev.txt

lint:
	. venv/bin/activate && pre-commit run --all-files
