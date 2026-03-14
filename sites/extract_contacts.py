#!/usr/bin/env python3
"""Extract contacts from sites.json and mirror site config.js files."""

import json
import re
import sys
import urllib.request
import urllib.error
from pathlib import Path

SITES_JSON = Path(__file__).parent / "sites.json"
CONFIG_JS_PATH = "/site/config.js"
TIMEOUT = 10

# Regex to find email addresses or "Name <email>" patterns
EMAIL_RE = re.compile(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}')
CONTACT_RE = re.compile(r'(?:contact|operator|email|monitor)\s*[=:]\s*["\']?([^"\';\n]+)', re.IGNORECASE)


def extract_emails_from_text(text):
    return set(EMAIL_RE.findall(text))


def fetch_config_js(domain):
    url = f"https://{domain}{CONFIG_JS_PATH}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  [{domain}] error: {e}", file=sys.stderr)
        return None


def main():
    data = json.loads(SITES_JSON.read_text())
    sites = data["sites"]

    contacts = set()

    # Extract from sites.json monitor/contact fields
    for key, site in sites.items():
        for field in ("monitor", "contact"):
            val = site.get(field)
            if val:
                contacts.update(EMAIL_RE.findall(val))

    # Fetch config.js for mirrors
    mirrors = [key for key, site in sites.items() if site.get("mirror")]
    print(f"Fetching config.js from {len(mirrors)} mirror sites...", file=sys.stderr)

    for domain in mirrors:
        content = fetch_config_js(domain)
        if content:
            found = extract_emails_from_text(content)
            if found:
                print(f"  [{domain}] found: {', '.join(sorted(found))}", file=sys.stderr)
            contacts.update(found)

    # Output deduped, sorted list
    for contact in sorted(contacts):
        print(contact)


if __name__ == "__main__":
    main()
