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
  ami                    = "ami-08ec94f928cf25a9d"
  instance_type          = "t2.micro"
  subnet_id              = data.aws_subnet.algia_subnet.id
  vpc_security_group_ids  = [data.aws_security_group.algia_security_group.id]
  associate_public_ip_address = true
  key_name               = "AlgiaF"

  tags = {
    Name = "AlgiaInstance"
  }
}
