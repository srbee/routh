
// myInit() function has been added to reset x and y for disp
function setup() {
  createCanvas(800, 800);
  p=0;q=0
  mp=-1;mq=-1//for zero entry in first col
  mp1=-1;//all zeros in this col
  zk=0
  flag1=false//zero in first col
  flag2=false//all zeros in a row
  //coeffs=[1,20,10,100]//no sign changes
  //coeffs=[1,2,6,8,1]//no sign changes
  //coeffs=[1,2,8,15,20,16,16]//4 sign changes
  //coeffs=[2,10,5,5,10]//2 sgn chgs
  
  //coeffs=[1,20,10,400]//2 sign changes
  //coeffs=[1,-4,1,6]//normal 2 sign changes
  //======= Pathological Cases ==========
  //==Pathological Type 1 cases solved by the program ==
  //coeffs=[1,1,2,2,3]// spl zero in first col, third row
  //coeffs=[1,1,4,4,2,1]// spl zero in first col, third row
  
  //==== Pathological Type 2 == All zeros in a row ==
  coeffs=[1,4,8,8,7,4]//allzeros in 5th row
  //coeffs=[1,1,0,-1,-1]// all zeros in s^1 row
  
  //===================================
  r=[]
  epsilon=1/(10**2)
  //print(epsilon)
  
  //frameRate(1)
  x=0;y=0
  xs=100//x_start for table disp
  ys=200//y_start for table disp
  
  myCreateInput(xs-40,ys-100)
  initXY()
  xSpacing=100;ySpacing=30
}//end of function setup()

function draw() {
  background('aqua');
  //print('flag='+flag)
  createLinks()
  //print('coeffs[]='+coeffs)
  myInit()
  makeRouth(n)
   j=0
  //forming the first row of Routh table
 for(i=0;i<n;i+=2){
    r[0][j]=coeffs[i]
  // print('r[0][0]'+r[0][0])
    j=j+1
}//first row of Routh Table
  r[0][j]=0; //adding one more entry in the row
  k=0
  //2nd row of Routh table
  for(i=1;i< n;i+=2){
    //print('i= '+i)
    r[1][k]=coeffs[i]
    //text(r[1][j],x,y)
    //x=x+20
    k=k+1
  }//second row of Routh Table
  
  r[1][k]=0 ; //adding one more entry 
  
  //testing of matrix
  //print('first row of routh table')
  /*
  row=0
  for(i=0;i<(nr1+1);i++){
   // print(r[row][i])
    //text(r[row][i],x,y)
    x=x+xSpacing
  }
   x=xs;y=y+ySpacing
  //print('2nd row of routh table')
  row=1
  for(i=0;i<(nr2+1);i++){
   // print(r[row][i])
    //text(r[row][i],x,y)
    x=x+xSpacing
  }
  */
  //Routh Table calculations
  
  kk=0
  for(p=2;p<(n);p++){
    kk=kk+1
    for(q=0;q<(nr2);q=q+1){
    num=(((r[(p-2)][(q+1)])*(r[(p-1)][0]))-((r[(p-2)][0])*(r[(p-1)][(q+1)])))
    den=(r[(p-1)][0])
      
    //if(q >(nr2)){r[p][q]=0}
      
    //if((q==0) &&(p >1 ) && (num==0)) {num=epsilon;mp=p;;mq=q}//end of if
        
    r[p][q]=(num/den).toFixed(2)
        
   //if((q==0) &&(p >1 ) && (r[p][q])==0) {r[p][q]=epsilon;mp=p;;mq=q}//end of if  
    //checkEps()//check for any zero entry in the first col and replace it by 'epsilon'
        
    }//end of for loop for q
    //print(' Just before checkEps() '+'p='+p+' flag='+flag)
  if( flag2==false){checkEps()}
  //print('p= '+p+' no of non-zeros = '+zk)
    if(flag1==true && flag2==false){
      print('zero in first col')
    }
    
   
    
  }//end of for loop for p
  
  dispRouth()
  //print('r[][]='+r)
  
  dispCharEqn()
  
  //print('No of sign changes='+signChanges())
  //x=100;y=100
  initXY()
}//end of function draw()

function makeRouth(order){
  r=[]
  for(i=0;i<order;i++){
    r[i]=[]
  }//end of for loop
  
  for(i=0;i<order;i++){
    for(j=0;j<order;j++){
      r[i][j]=0
    }
    
  }
  return r
}//end of function makeRouth()

function dispRouth(){
  //x=100;
  x=xs
  y=y+1.5*ySpacing
  x1=xs-70,y1=ys+20,x2=x1+n*50;y2=y1
  line(x1,y1,x2,y2)//hori line
  line(x1,y1+4,x2,y2+4)
  x3=xs-30;y3=ys-20;x4=x3;y4=ys+n*35
  line(x3,y3,x4,y4)//vert line
  line(x3+4,y3,x4+4,y4)
  textSize(18)
  push();fill('green');textSize(25)
  text('Routh  Table',xs,ys)
  pop()
  for(rr=0;rr<n;rr++){
    if(rr==0 || rr==1){fill('red')}else{fill('black')}
    text('s^'+(n-rr-1),x-70,y)
    for(cc=0;cc< nr1;cc++){
      //print('mp,mq= '+mp+' '+mq)
      //for all zeros in a row
      if(rr==mp1){}
       
       if((rr==mp) && (cc==mq)) 
       { 
         //r[rr][cc]=r[rr][cc]+'Epsilon'
          push();fill(200,200,0)
         circle(x+15,y-5,35)
         pop()
         text('Eps',x,y)
         text('Eps='+epsilon,x+300,y)
         push();fill('red')
         text('Alert:Entry in first column is zero',xs+150,ys)
         pop()
        }else{
      text(r[rr][cc],x,y)
       }
      x=x+xSpacing
    
      }//end of cols
   // x=100
    x=xs
    y=y+ySpacing
  }//end of rows
  
  text('No of sign changes in the first column = '+signChanges(),x-60,y+15)
  push();fill('red')
  text('No roots in the right half of s-plane  = '+signChanges(),x-60,y+35)
  pop()
  push();fill('green');textStyle(BOLD);textSize(12)
  text('B.C. Kuo, "Automatic Control Systems",6th Ed. pp [301]',x-60,y+85)
  pop()
  push();textSize(12)
  text('s^3+20s^2+10s+400=0',x-10,y+85+30)
  text('s^3+20s^2+10s+100=0',x-10,y+85+2*30)
  text('2s^4+10s^3+5s^2+5s+10=0',x-10,y+85+3*30)
  text('s^4 +2s^3 +6s^2+8s+1 =0',x-10,y+85+4*30)
  text('s^4 +2s^3 +10s^2+20s+5=0',x-10,y+85+5*30)
  text('s^6+2s^5+8s^4 +15s^3 +20s^2+16s+16=0',x-10,y+85+6*30)
  pop()
}//end of function dispRouth()

function dispCharEqn(){
  myStr=''
  for(i=0;i<n;i++){
    //if(i !== 0){
    myStr=myStr+coeffs[i].toString()
  //}
    
    if((n-1-i) !==0 ){
    myStr=myStr+'s^'+(n-1-i).toString()+" + "}
    
  }//end of for loop
  myStr=myStr+' =0 '
  //print(myStr)
  text(myStr,xs-50,ys-50)
}//end of function dispCharEqn()

function signChanges(){
  //to find number of sign changes in first column
  sk=0
  for( pp=0;pp<(n-1);pp++){
    pah=r[pp][0]
    dus=r[pp+1][0]
    if(((pah>0) && (dus<0))||((pah<0) &&(dus>0))){
      sk=sk+1
      }//end of if
  }//end of for loop 
  
  return sk
  
}//end of function signChanges()

function initXY(){
   //x=100;
   x=xs
   //y=100
   y=ys
}//end of function myInit()

function myInit(){
 // r=[]
  //coeffs=[10,10,30,90,100,18]
  mp=-1;mq=-1
  mp1=-1
  zk=0
  flag1=false;flag2=false
   push();stroke('red')
  text('Enter  coeffs, separated by comma ',xs-40,ys-106)
  pop()
  n=coeffs.length
  //print('n= '+n)
  
  r[0]=[]
  r[1]=[]
  
  for(rw=0;rw<n+1;rw++){
    r[rw]=[]
    for(cn=0;cn<n;cn++){
       r[rw].push(0)
    }//end of row
  }//end of column
  
  //print('r[][]='+r)
  //nr1=cols in first row
  //nr2=cols in 2nd row
  if(n%2==0){nr1=n/2;nr2=nr1}else{
    nr1=round(n/2)
    nr2=n-nr1
  }
  
}//end of function myInit()

function myCreateInput(xx,yy){
  let inp = createInput('');
  inp.input(myInputHandler);
  inp.position(xx,yy)
  inp.size(300,20)
  
}//end of function myCreateInput()

function myInputHandler(){
  myStr=this.value()
  arr=myStr.split(",")
  if(arr.length < 2 ){}else{coeffs=myStr.split(",")}
  //print("arr[]="+arr)
  //print("arr[0]="+arr[0],"arr[1]="+arr[1])
  //coeffs=arr
}//end of function myInputHandler()

function createLinks(){
  addr1="https://srbee.github.io/srbee"
  linkText1="Back to Main Menu"
  mantra="_blank"
  link1=createA(addr1,linkText1,mantra)
  link1.position(100,10)
  //------------------------
  addr2="https://en.wikipedia.org/wiki/Routh%E2%80%93Hurwitz_stability_criterion"
  linkText2="Routh-Hurwitz Stability Criterion"
  mantra="_blank"
  link2=createA(addr2,linkText2,mantra)
  link2.position(100,30)
  link2.style=("font-size",15+"px")
  link2.addClass('bigLink')
  
}//end of function createLinks()

function checkEps(){
  // check for zero entry in first col
  zk=0
  //print('Inside checkEps()')
  //if((q==0) &&(p >1 ) && (r[p][0])==0) {r[p][0]=epsilon;mp=p;;mq=q}//end of if 
  //if((r[p][0])==0) {r[p][0]=epsilon;mp=p;;mq=q}//end of if 
  // zk is the count of zeros
  //print('Scanning row '+p)
  for(c=0;c<n;c++){
    if(r[p][0]==0){flag1=true}
    ele=r[p][c]
  //print('p='+p+' q= '+c+'  r[p][c]='+r[p][c])
  if(ele != 0){zk=zk+1}
  
  }//end of for(c=0;c<n;c++)
  
  if(zk==0){
    flag2=true
    mp1=p
    //print('row= '+p+' s^'+(n-1-p) +'  all elements are zero')
    //text('row:'+(p+1)+'=> s^'+(n-1-p) +':all elements were zero',xs+n*50,y+1.5*ySpacing+(p)*ySpacing)
    push();fill('red');textSize(14);textStyle(BOLDITALIC);
    text('!! Note !!:  row:'+(p+1)+'=> s^'+(n-1-p) +':all elements were zero',xs-40,y-30)
    pop()
    push();fill(255,255,0,255)
    rect(xs-5,y+0.9*ySpacing+(p)*ySpacing,n*45,20)
    pop()
    //Recomputing elements by diff upper row
    for(qqq=0;qqq<2;qqq++){r[p][qqq]= (r[p-1][qqq])*(n-p-2*qqq) } 
    
    
  } //end of if
  
  if(flag1==true && flag2==false){
    print('zero in first col of row ='+p)
    r[p][0]=epsilon
    mp=p;mq=0
  }
  flag1=false
}//end of function checkEps()





 