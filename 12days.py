l=["Twelve Drummers Drumming","Eleven Pipers Piping","Ten Lords a Leaping","Nine Ladies Dancing","Eight Maids a Milking","Seven Swans a Swimming","Six Geese a Laying","Five Golden Rings","Four Calling Birds","Three French Hens","Two Turtle Doves","partridge in a Pear Tree"]
n=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth"]
for i in range(0,12):
 print("On the "+nums[i]+" day of Christmas")
 print("my true love sent to me:")
 for j in range(0,i+1):
  l=lyrics[11-i+j]
  if j==i:print(("And a " if i>1 else "A ")+l)
  else:print(l)
 if i!=11:print("")
