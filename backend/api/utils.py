import string, random

def generate_hash(length = 6):
    chars = string.ascii_letters + string.digits
    hash = "".join(random.choice(chars) for _ in range(length))
    return hash