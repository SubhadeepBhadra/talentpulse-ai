from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
import sys

PORT = 5173
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def run():
    for p in range(PORT, PORT + 20):
        try:
            httpd = ThreadingHTTPServer(("", p), Handler)
            print(f"TalentPulse AI server started at http://localhost:{p}")
            sys.stdout.flush()
            httpd.serve_forever()
            break
        except OSError:
            continue

if __name__ == "__main__":
    run()
