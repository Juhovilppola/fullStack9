const App = () => {
  interface CourseHeader {
    name: string;
  }

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }
  interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special"
  }

 
  
  interface Parts {
    parts: CoursePart;
  }

  interface CourseContent {
    courses: CoursePart[];
  }
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
 
  
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  const Part = (props: Parts) : JSX.Element => {
    console.log(props);
    const {parts} = props
    switch (parts.kind) {
      case "basic":
        return(
          <div>
            <b>{parts.name} {parts.exerciseCount}</b>
            <p>{parts.description}</p>
          </div>
        )
      case "group":
        return(
          <div>
            <b>{parts.name} {parts.exerciseCount}</b>
            <p>project exercises {parts.groupProjectCount}</p>
          </div>
        )

      case "background":
        return(
          <div>
            <b>{parts.name} {parts.exerciseCount}</b>
            <p>{parts.description}</p>
            <p>Submit to {parts.backgroundMaterial}</p>
          </div>
        )
        case "special": 
          return(
            <div>
            <b>{parts.name} {parts.exerciseCount}</b>
            <p>{parts.description}</p>
            <p> required skills {parts.requirements.join(", ")}</p>
          </div>
          )
        default:
          break;
    }
    return (
      <></>
    )

   
  }

  const Header = (props: CourseHeader): JSX.Element => {
    return <h1>{props.name}</h1>
  }

  const Content = (props: CourseContent): JSX.Element => {
    return <div>
      {props.courses.map((course, id)=> (
      <Part key={id} parts ={course}/> ))}
      </div>
    
  }
  const Total = (props: CourseContent) => {
    return (
      <p>
        Number of exercises {props.courses.reduce((sum, part) => sum + part.exerciseCount, 0)}
      </p>
    )
  }
  

  

  return (
    <div>
      <Header name = {courseName}/>
      <Content courses ={courseParts}/>
      <Total courses = {courseParts}/>
    </div>
  );
};

export default App;

