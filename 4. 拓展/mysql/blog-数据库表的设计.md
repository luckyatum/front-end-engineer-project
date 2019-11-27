# [数据库表的设计](https://www.jianshu.com/p/b3969c49dfaa)

数据库表格一般会有一对一、一对多、多对多、自关联四种

## 一对一的表设计

如人和身份证就是一对一关系，只需要给人和身份证各设计一张表，后再加关系，idcard身份证的id列设为外键约束

![一对一设计](https://upload-images.jianshu.io/upload_images/1037735-db2eff2386c64ade.png?imageMogr2/auto-orient/strip|imageView2/2/w/1146/format/webp)

```sql
create table person
(
    id int primary key,
    name varchar(40)
);

create table idcard
(
    id int primary key,
    city varchar(40),
    constraint id_FK foreign key(id) references person(id)  
);
```

## 一对多或者多对一的设计

假设做一个部门管理系统，部门department和员工employee是一对多的关系，不管对象引用关系，只管基本属性，根据基本属性建表，在多的一方加外键列描述数据之间的关系

![一对多、多对一设计](https://upload-images.jianshu.io/upload_images/1037735-b88e51c14e5b0438.png?imageMogr2/auto-orient/strip|imageView2/2/w/1133/format/webp)

```sql
create table department
(
    id int primary key,
    name varchar(40)
);


create table employee
(
    id int primary key,
    name varchar(40),
    salary decimal(8,2),
    department_id int,
    constraint department_id_FK foreign key(department_id) references department(id)
);
```

## 多对多的表设计

一个老师可以有多个学生，一个学生也可以有多个老师，只需要把老师和学生的相关属性用表描述出来，然后设计一个中间表，两列做联合主键，加上外键约束

![多对多设计](https://upload-images.jianshu.io/upload_images/1037735-2617a6ad6d670b7d.png?imageMogr2/auto-orient/strip|imageView2/2/w/1152/format/webp)

```sql
create table teacher
(
    id int primary key,
    name varchar(40),
    salary decimal(8,2)
);

create table student
(
    id int primary key,
    name varchar(40)
);

create table teacher_student
(
    teacher_id int,
    student_id int,
    primary key(teacher_id,student_id),
    constraint teacher_id_FK foreign key(teacher_id) references teacher(id),
    constraint student_id_FK foreign key(student_id) references student(id) 
);
```

## 自关联表设计

一个家庭里有多个人，家族成员之间的关系是自关联的

![自关联表设计](https://upload-images.jianshu.io/upload_images/1037735-c0e2fd00f7e95876.png?imageMogr2/auto-orient/strip|imageView2/2/w/696/format/webp)

```sql
create table person
(
    id int primary key,
    name varchar(40),
    parent_id int,
    constraint parent_id_FK foreign key(parent_id) references person(id)
);
```
