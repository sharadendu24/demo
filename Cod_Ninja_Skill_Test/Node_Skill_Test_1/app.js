const express = require('express')
const mysql=require('mysql')
const app = express()
const port = 3000
const bodyParser=require('body-parser')
const fs=require('fs')
const e = require('express')


//querry to get all the project 
var querryp='SELECT * FROM test1;'





//storing mysql database details in a variable
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'nodejs'
});

//creating a connection to the mysql nodejs database.
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


// setting express view engine as ejs
app.set('view engine', 'ejs');
//setting express to use json format to post data.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var a;
var n;








//using mysql to fetch all the projects;
con.query(querryp, function (err, result) {
    if (err) throw err;
    console.log(result);
    a=result;
    m=result.length-1;
    n=result[m].Id+1;
});



app.get('/', (req, res) => {


    con.query(querryp, function (err, result) {
        if (err) throw err;
        console.log(result);
        a=result;
        m=result.length-1;
        n=result[m].Id+1;
    });


    res.render('pages/home',{
        a: a
    })
})





app.get('/createproject', (req, res) => {
    
    res.render('pages/createproject')

})


app.post('/createproject',  (req, res) => {

    console.log(req.body)

    const formdata=req.body;
    const Name=formdata.Name;
    const Description=formdata.Description;
    const Author=formdata.Author;

    console.log(n);
        

    var sql = "INSERT INTO test1 (Id, Name, Description, Author) VALUES (?, ?, ?, ?)";
    

    // Executing the query with locally scoped variables.
    con.query(sql, [n, Name, Description, Author], (error, results, fields) => {
        if (error) {
        console.error('Error executing MySQL query:', error);
        return;
        }
        console.log('Data inserted successfully');

        
    });

    res.redirect('/')
    
})



app.get('/createissue', (req, res) => {

    const q=req.query

    console.log(q.id+"this is in get createissue")
    res.render('pages/createissue',{
        id:q.id
    })

})





app.post('/createissue', (req, res) => {

    const issue=req.body;
    console.log(issue);

    

    const sql1='SELECT COUNT(*) AS c FROM test1_issue;'



    con.query(sql1, (error, result1, fields) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
           return;
        }
         console.log('value n is declared');
            
        //n= results[0].c;

        console.log(result1[0].c);


        const sql2='SELECT Author FROM test1 WHERE Id=?;'



        con.query(sql2 ,issue.id, (error, result2, fields) => {
            if (error) {
            console.error('Error executing MySQL query:', error);
            return;
            }
            console.log(result2 +"for sql2 in post create issue method");
            
            //iss= results[0].Author;
            
            console.log(result2[0].Author);


            console.log(result1[0].c+1 ,  issue.id, issue.Title, issue.Description, issue.label, result2[0].Author +"\n \n In the post create issue method after this message the querry for the data insertion in the test1_issue table will be fired;")

            addIssue(result1[0].c+1 ,  issue.id, issue.Title, issue.Description, issue.label, result2[0].Author);

            res.redirect('/');
            
        });


       

            
    });
        

        //
    


})






app.get('/details', (req, res) => {

    const q=req.query;

    console.log(q);

    if(q.label==null && q.author==null && q.search==null){

        const sql="SELECT * FROM test1_issue WHERE id=?";

        
        con.query(sql, [q.id], function (err, result) {
            if (err) throw err;
            //console.log(result);
            const issues=result;
            console.log(issues);
            const data={
                o: a.filter((a)=> a.Id==q.id),
                issue: issues
        
            }
            
            console.log("this is id "+ q.id);
            res.render('pages/details',{
                data:data        
            })
        });
    }

    else if(q.label==null && q.author==null){

        const sql="SELECT * FROM test1_issue WHERE id=? AND title LIKE ? ;";

        var tit='%'+q.search+'%';

        
        con.query(sql, [q.id, tit], function (err, result) {
            if (err) throw err;
            //console.log(result);
            const issues=result;
            console.log(issues);
            const data={
                o: a.filter((a)=> a.Id==q.id),
                issue: issues
        
            }
            
            console.log("this is id "+ q.id);
            res.render('pages/details',{
                data:data        
            })
        });


        
    }

    else{
        var fil=q.label;
        var auth='%'+q.author+'%';

        const sql="SELECT * FROM test1_issue WHERE id=? AND Labels In (?) AND Author LIKE ?;";

        

        
        con.query(sql, [q.id, fil, auth], function (err, result) {
            if (err) throw err;
            //console.log(result);
            const issues=result;
            console.log(issues);
            const data={
                o: a.filter((a)=> a.Id==q.id),
                issue: issues
        
            }
            
            console.log("this is id "+ q.id);
            res.render('pages/details',{
                data:data        
            })
        });


    }

    

})




//helper function to add Issues to the backend.........................................

function addIssue(a, b, c, d, e, f){


    var sql = "INSERT INTO test1_issue (IssueId, Id, Title, Description, Labels, Author) VALUES (?, ?, ?, ?, ?, ?)";
    

    // Executing the query with locally scoped variables.
    con.query(sql, [a, b, c, d, e, f], (error, results, fields) => {
        if (error) {
        console.error('Error executing MySQL query:', error);
        return;
        }
        console.log('Issue inserted successfully');

        
    });


}










app.listen(port, () => {

  console.log(`App listening at port ${port}`)

})
