import Img from "./club_images/image.png";
import chess from "./club_images/chess.jpg";
import z_undaa from "./club_images/100_undaa.png";

export const clubs = [
// id explanation:
// t=type: c=contest s=sport a=art, e=education
// digit: in that category, order number (each category numbers starts from 1 to 9)

// college year: 1=1st, 2=2nd, 3=3rd, 4=4th, 5=5th
// engineer class: 1=Барилгын инженер, 2=Механикийн инженер, 3=Цахилгаан инженер, 4=Био инженер, 5=Компьютерийн инженер
  {
    // filter
    id: "te2",
    name: "Сагсан бөмбөгийн клуб",
    maximumMember: 15,
    allowedCollegeYear: ["1", "3"],
    allowedEngineerClass: ["1", "3"],
    image: Img,
    
    // display info
    leaderId: "mk25c001", //use Student Id to register
    explanation: "Training and friendly matches to improve physical health.",
    goal: "Build teamwork and participate in inter-college tournaments.",
    memberIds: [
        "mk25c001", 
        "mk25c002", 
        "mk25c003"],
    whatDayOfWeek: ["Мягмар", "Баасан"],
    fromWhatTime: [17, 0],
    untilWhatTime: [19, 0]
  },
  {
    id: "ta1",
    name: "Robocon",
    maximumMember: 20,
    allowedCollegeYear: ["1", "4"],
    allowedEngineerClass: ["1", "4"],
    image: Img,

    leaderId: "mk25c002",
    explanation: "Focuses on robotics, electronics, and programming projects.",
    goal: "Build competition-level robots and improve engineering skills.",
    memberIds: [
        "mk25c002", 
        "S2023005",
        "S2023010"],
    whatDayOfWeek: ["Даваа", "Лхагва"],
    fromWhatTime: [16, 0],  //hour, minute
    untilWhatTime: [18, 0]
  },
  {
    id: "ts3",
    name: "Япон хэлний сургалт",
    maximumMember: 25,
    allowedCollegeYear: ["1", "4"],
    allowedEngineerClass: ["1", "4"],
    image: Img,

    leaderId: "S2021007",
    explanation: "Practicing Japanese language and culture.",
    goal: "Improve JLPT levels and speaking confidence.",
    memberIds: [
        "S2021007", 
        "S2023002", 
        "S2023008"],
    whatDayOfWeek: ["Лхагва"],
    fromWhatTime: [16, 30],
    untilWhatTime: [18, 0]
  },
  {
    id: "te4",
    name: "100-ийн ундаа",
    maximumMember: 10,
    allowedCollegeYear: ["2", "4"],
    allowedEngineerClass: ["2", "4"],
    image: z_undaa,

    leaderId: "S2022009",
    explanation: "Learning instruments and performing at events.",
    goal: "Perform at school festivals and ceremonies.",
    memberIds: [
        "S2022009", 
        "S2022011"],
    whatDayOfWeek: ["Пүрэв"],
    fromWhatTime: [15, 40],
    untilWhatTime: [17, 30]
  },
  {
    id: "ta5",
    name: "Zero to Hero",
    maximumMember: 30,
    allowedCollegeYear: ["1", "4"],
    allowedEngineerClass: ["1", "4"],
    image: Img,

    leaderId: "S2021015",
    explanation: "Learning algorithms, web, and mobile development.",
    goal: "Prepare students for hackathons and real projects.",
    memberIds: [
        "S2021015",
        "S2022003",
        "S2023009",
        "S2023012"],
    whatDayOfWeek: ["Даваа", "Пүрэв"],
    fromWhatTime: [16, 0],
    untilWhatTime: [18, 30]
  },
  {
    id: "tc1",
    name: "Шатрын сургалт",
    maximumMember: 20,
    allowedCollegeYear: ["2", "3", "4"],
    allowedEngineerClass: ["2", "3"],
    image: chess,

    leaderId: "S1023",
    explanation: "Prepare students for programming contests",
    goal: "Win national competitions",
    memberIds: [
        "S1001", 
        "S1002"],
    whatDayOfWeek: ["Даваа", "Лхагва"],
    fromWhatTime: [16, 0],
    untilWhatTime: [18, 0]
  },
  {
    id: "ts1",
    name: "Воллейбол клуб",
    maximumMember: 25,
    allowedCollegeYear: ["1", "2", "3", "4"],
    allowedEngineerClass: ["1", "2", "3", "4"],
    image: Img,

    leaderId: "S2001",
    explanation: "Improve teamwork and fitness",
    goal: "Inter-college tournaments",
    memberIds: [],
    whatDayOfWeek: ["Мягмар", "Баасан"],
    fromWhatTime: [17, 0],
    untilWhatTime: [19, 0]
  }  
];
