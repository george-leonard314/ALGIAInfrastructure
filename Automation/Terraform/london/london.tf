provider "aws" {
  region = "eu-west-2"
}

data "aws_vpc" "algia_vpc" {
  filter {
    name   = "tag:Name"
    values = ["AlgiaVPC"] 
  }
}

data "aws_subnet" "algia_subnet" {
  filter {
    name   = "tag:Name"
    values = ["AlgiaSubnet"]
  }
}

data "aws_security_group" "algia_security_group" {
  filter {
    name   = "tag:Name"
    values = ["algiasecuritygroup"]
  }
}

resource "aws_instance" "algia_instance" {
  ami                    = "ami-0acc77abdfc7ed5a6"
  instance_type          = "t2.micro"
  subnet_id              = data.aws_subnet.algia_subnet.id
  vpc_security_group_ids  = [data.aws_security_group.algia_security_group.id]
  associate_public_ip_address = true
  key_name               = "AlgiaL"

  tags = {
    Name = "AlgiaInstance"
  }
}


output "instance_public_ip" {
  value = aws_instance.algia_instance.public_ip
}