export const goBack = (props) => {

    // console.log(props)
    
    if(props.location.pathname === "/AdminPannelPage"){
        props.history.push("/MainDashBoard")
    }else if(props.location.pathname === "/CollectorPannelPage"){
        props.history.push("/MainDashBoard")
    }else{
        props.history.goBack();
    }
}

export const changePath = (name, props) => {
    props.history.push(`/${name}`)
}