resource "tls_private_key" "ssh_key" {
    algorithm = "RSA"
    rsa_bits  = 4096
  
}

resource "aws_key_pair" "ssh_key" {
    key_name   = "ssh-key"
    public_key = tls_private_key.ssh_key.public_key_openssh
}

resource "local_file" "private_key" {
    content         = tls_private_key.ssh_key.private_key_pem
    filename        = "/home/reda/.ssh/ssh-key.pem"
    file_permission = "0400"
  
}